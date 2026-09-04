// Background service worker for Multi-Engine Search Pro
importScripts('engines.js');

// Register context menu when extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: 'multi_engine_search_selection',
      title: 'Search with Multi-Engine: "%s"',
      contexts: ['selection']
    });
  });
});

// Omnibox keyword search: ms <query>
chrome.omnibox.onInputStarted.addListener(async () => {
  try {
    const result = await chrome.storage.local.get([STORAGE_KEYS.selectedEngines]);
    const saved = result ? result[STORAGE_KEYS.selectedEngines] : null;
    const count = Array.isArray(saved) && saved.length > 0 ? saved.length : 1;
    chrome.omnibox.setDefaultSuggestion({
      description: `Multi-Engine Search (${count} active ${count === 1 ? 'engine' : 'engines'}): <match>%s</match>`
    });
  } catch (e) {
    chrome.omnibox.setDefaultSuggestion({
      description: 'Multi-Engine Search across active engines: <match>%s</match>'
    });
  }
});

chrome.omnibox.onInputEntered.addListener(async (text) => {
  const query = text.trim();
  if (!query) return;
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await performMultiSearch(query, activeTab);
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, currentTab) => {
  if (info.menuItemId === 'multi_engine_search_selection' && info.selectionText) {
    const query = info.selectionText.trim();
    if (!query) return;
    await performMultiSearch(query, currentTab);
  }
});

/**
 * Shared multi-engine search execution across background triggers
 */
async function performMultiSearch(query, currentTab) {
  try {
    // Load user's selected engines from local storage
    const result = await chrome.storage.local.get([STORAGE_KEYS.selectedEngines]);
    const savedEngines = result ? result[STORAGE_KEYS.selectedEngines] : null;
    const selectedEngines = Array.isArray(savedEngines) && savedEngines.length > 0
      ? savedEngines
      : ['google'];

    const encodedQuery = encodeURIComponent(query);
    const validEngines = selectedEngines.filter(engineId => SEARCH_ENGINES[engineId]);

    // Open tabs right after the current active tab
    const startIndex = currentTab?.index !== undefined ? currentTab.index + 1 : undefined;

    const tabPromises = validEngines.map((engineId, idx) => {
      const engine = SEARCH_ENGINES[engineId];
      const url = engine.url.replace('{query}', encodedQuery);
      return chrome.tabs.create({
        url,
        active: false,
        index: startIndex !== undefined ? startIndex + idx : undefined
      });
    });

    const createdTabs = await Promise.all(tabPromises);

    // Group tabs if enabled in user options
    const groupResult = await chrome.storage.local.get([STORAGE_KEYS.groupTabs]);
    const shouldGroup = groupResult && groupResult[STORAGE_KEYS.groupTabs] !== undefined
      ? Boolean(groupResult[STORAGE_KEYS.groupTabs])
      : true;

    if (shouldGroup && chrome.tabs && chrome.tabs.group && createdTabs.length > 0) {
      try {
        const tabIds = createdTabs.map(t => t.id).filter(id => id !== undefined);
        if (tabIds.length > 0) {
          const groupId = await chrome.tabs.group({ tabIds });
          if (chrome.tabGroups && chrome.tabGroups.update) {
            const displayQuery = query.length > 25 ? query.slice(0, 25) + '…' : query;
            await chrome.tabGroups.update(groupId, {
              title: `🔍 ${displayQuery}`,
              color: 'blue'
            });
          }
        }
      } catch (groupError) {
        console.warn('Tab grouping failed in background:', groupError);
      }
    }
  } catch (error) {
    console.error('Error executing multi search:', error);
  }
}
