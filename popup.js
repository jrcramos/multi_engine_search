// Multi-Engine Search Pro - Popup Logic
// STORAGE_KEYS and SEARCH_ENGINES are loaded from engines.js


// DOM elements
let queryInput, clearBtn, searchBtn, searchBtnText, statusDiv;
let selectAllBtn, clearAllBtn, enginesGrid, themeSelect;
let selectedChips, selectedCountBadge, filterToggleBtn;
let groupTabsCheckbox;
let filterOnlySelected = false;

// Initialize the popup
document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();
  await loadStoredData();
  attachEventListeners();
  updateUI();
  queryInput.focus();
});

function initializeElements() {
  queryInput = document.getElementById('query');
  clearBtn = document.getElementById('clearBtn');
  searchBtn = document.getElementById('searchBtn');
  searchBtnText = document.getElementById('searchBtnText');
  statusDiv = document.getElementById('status');
  selectAllBtn = document.getElementById('selectAllBtn');
  clearAllBtn = document.getElementById('clearAllBtn');
  enginesGrid = document.getElementById('enginesGrid');
  themeSelect = document.getElementById('themeSelect');
  selectedChips = document.getElementById('selectedChips');
  selectedCountBadge = document.getElementById('selectedCountBadge');
  filterToggleBtn = document.getElementById('filterToggleBtn');
  groupTabsCheckbox = document.getElementById('groupTabsCheckbox');
}

function applyTheme(theme) {
  if (!theme || theme === 'system') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

async function loadStoredData() {
  try {
    // Load theme preference
    if (chrome.storage && chrome.storage.local) {
      const themeResult = await chrome.storage.local.get([STORAGE_KEYS.theme]);
      const savedTheme = themeResult ? themeResult[STORAGE_KEYS.theme] : 'system';
      applyTheme(savedTheme || 'system');
      if (themeSelect) {
        themeSelect.value = savedTheme || 'system';
      }
    }

    // Load query from session storage if available (clears when browser closes)
    if (chrome.storage && chrome.storage.session) {
      try {
        const sessionResult = await chrome.storage.session.get([STORAGE_KEYS.lastQuery]);
        if (sessionResult && sessionResult[STORAGE_KEYS.lastQuery]) {
          queryInput.value = sessionResult[STORAGE_KEYS.lastQuery];
        }
      } catch (sessionError) {
        console.warn('Session storage not available for query:', sessionError);
      }
    }

    // Load selected engines from local storage (persists between sessions)
    if (chrome.storage && chrome.storage.local) {
      const localResult = await chrome.storage.local.get([STORAGE_KEYS.selectedEngines]);
      const savedEngines = localResult ? localResult[STORAGE_KEYS.selectedEngines] : null;
      const selectedEngines = Array.isArray(savedEngines) ? savedEngines : ['google'];

      const checkboxes = enginesGrid.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = selectedEngines.includes(checkbox.value);
      });

      // Load group tabs preference (default: true)
      const groupResult = await chrome.storage.local.get([STORAGE_KEYS.groupTabs]);
      const shouldGroup = groupResult && groupResult[STORAGE_KEYS.groupTabs] !== undefined
        ? Boolean(groupResult[STORAGE_KEYS.groupTabs])
        : true;
      if (groupTabsCheckbox) {
        groupTabsCheckbox.checked = shouldGroup;
      }
    }
  } catch (error) {
    console.error('Error loading stored data:', error);
    showStatus('Error loading saved data', 'error');
  }
}

async function saveSelectedEngines() {
  try {
    const selectedEngines = getSelectedEngines();
    if (chrome.storage && chrome.storage.local) {
      await chrome.storage.local.set({
        [STORAGE_KEYS.selectedEngines]: selectedEngines
      });
    }
  } catch (error) {
    console.error('Error saving selected engines:', error);
  }
}

async function saveQuery() {
  try {
    if (chrome.storage && chrome.storage.session) {
      const query = queryInput.value.trim();
      if (query) {
        await chrome.storage.session.set({
          [STORAGE_KEYS.lastQuery]: query
        });
      } else {
        await chrome.storage.session.remove(STORAGE_KEYS.lastQuery);
      }
    }
  } catch (error) {
    console.warn('Error saving query to session:', error);
  }
}

function attachEventListeners() {
  // Search button
  searchBtn.addEventListener('click', handleSearch);

  // Enter key in search input
  queryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  // Clear input button
  clearBtn.addEventListener('click', async () => {
    queryInput.value = '';
    queryInput.focus();
    updateUI();
    if (chrome.storage && chrome.storage.session) {
      try {
        await chrome.storage.session.remove(STORAGE_KEYS.lastQuery);
      } catch (e) {
        console.warn('Error removing query from session storage:', e);
      }
    }
  });

  // Select all engines
  selectAllBtn.addEventListener('click', async () => {
    const checkboxes = enginesGrid.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = true;
    });
    updateUI();
    await saveSelectedEngines();
  });

  // Clear all engines
  clearAllBtn.addEventListener('click', async () => {
    const checkboxes = enginesGrid.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
    updateUI();
    await saveSelectedEngines();
  });

  // Engine checkbox changes (save immediately on toggle)
  enginesGrid.addEventListener('change', async () => {
    updateUI();
    await saveSelectedEngines();
  });

  // Input changes
  queryInput.addEventListener('input', () => {
    updateUI();
    saveQuery();
  });

  // Theme selector
  if (themeSelect) {
    themeSelect.addEventListener('change', async (e) => {
      const selectedTheme = e.target.value;
      applyTheme(selectedTheme);
      if (chrome.storage && chrome.storage.local) {
        await chrome.storage.local.set({ [STORAGE_KEYS.theme]: selectedTheme });
      }
    });
  }

  // Filter toggle button (show selected only vs show all)
  if (filterToggleBtn) {
    filterToggleBtn.addEventListener('click', () => {
      filterOnlySelected = !filterOnlySelected;
      updateUI();
    });
  }

  // Group tabs toggle (enables or disables automatic tab grouping)
  if (groupTabsCheckbox) {
    groupTabsCheckbox.addEventListener('change', async (e) => {
      if (chrome.storage && chrome.storage.local) {
        await chrome.storage.local.set({ [STORAGE_KEYS.groupTabs]: e.target.checked });
      }
    });
  }

  // Category-level controls: Select All button, Clear button, and Title click toggle
  enginesGrid.querySelectorAll('.engine-category').forEach(header => {
    function getCategoryCheckboxes() {
      let sibling = header.nextElementSibling;
      const catCheckboxes = [];
      while (sibling && !sibling.classList.contains('engine-category')) {
        if (sibling.classList.contains('engine-item')) {
          const cb = sibling.querySelector('input[type="checkbox"]');
          if (cb) catCheckboxes.push(cb);
        }
        sibling = sibling.nextElementSibling;
      }
      return catCheckboxes;
    }

    const selectBtn = header.querySelector('.cat-select');
    if (selectBtn) {
      selectBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const catCheckboxes = getCategoryCheckboxes();
        catCheckboxes.forEach(cb => { cb.checked = true; });
        updateUI();
        await saveSelectedEngines();
      });
    }

    const clearBtn = header.querySelector('.cat-clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const catCheckboxes = getCategoryCheckboxes();
        catCheckboxes.forEach(cb => { cb.checked = false; });
        updateUI();
        await saveSelectedEngines();
      });
    }

    const titleText = header.querySelector('.category-title-text');
    if (titleText) {
      titleText.title = 'Click to toggle all engines in this category';
      titleText.addEventListener('click', async () => {
        const catCheckboxes = getCategoryCheckboxes();
        if (catCheckboxes.length > 0) {
          const allChecked = catCheckboxes.every(cb => cb.checked);
          catCheckboxes.forEach(cb => { cb.checked = !allChecked; });
          updateUI();
          await saveSelectedEngines();
        }
      });
    }
  });

  // Gracefully hide any engine icons that fail to load
  document.querySelectorAll('.engine-icon').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });
}

function getSelectedEngines() {
  const checkboxes = enginesGrid.querySelectorAll('input[type="checkbox"]:checked');
  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function renderSelectedChips(selectedEngines) {
  if (!selectedChips) return;
  selectedChips.innerHTML = '';

  if (selectedEngines.length === 0) {
    const emptyNotice = document.createElement('div');
    emptyNotice.className = 'selected-chips-empty';
    emptyNotice.textContent = 'No engines active — check engines below or click Select All';
    selectedChips.appendChild(emptyNotice);
    return;
  }

  selectedEngines.forEach(engineId => {
    const engine = SEARCH_ENGINES[engineId];
    if (!engine) return;

    const chip = document.createElement('div');
    chip.className = 'selected-chip';
    chip.title = `Click to remove ${engine.name}`;
    chip.setAttribute('data-engine', engineId);

    const icon = document.createElement('img');
    icon.className = 'chip-icon';
    icon.src = `icons/engines/${engineId}.ico`;
    icon.alt = '';
    icon.addEventListener('error', () => { icon.style.display = 'none'; });

    const nameSpan = document.createElement('span');
    nameSpan.textContent = engine.name;

    const removeSpan = document.createElement('span');
    removeSpan.className = 'chip-remove';
    removeSpan.textContent = '×';

    chip.appendChild(icon);
    chip.appendChild(nameSpan);
    chip.appendChild(removeSpan);

    chip.addEventListener('click', async () => {
      const cb = enginesGrid.querySelector(`input[value="${engineId}"]`);
      if (cb) {
        cb.checked = false;
      }
      updateUI();
      await saveSelectedEngines();
    });

    selectedChips.appendChild(chip);
  });
}

function applyGridFilter() {
  if (!filterToggleBtn || !enginesGrid) return;
  const items = enginesGrid.querySelectorAll('.engine-item');
  const categories = enginesGrid.querySelectorAll('.engine-category');

  if (!filterOnlySelected) {
    items.forEach(item => item.style.display = 'flex');
    categories.forEach(cat => cat.style.display = 'flex');
    filterToggleBtn.classList.remove('active');
    filterToggleBtn.textContent = 'Filter: Show Selected Only';
    return;
  }

  filterToggleBtn.classList.add('active');
  const totalEngines = Object.keys(SEARCH_ENGINES).length;
  filterToggleBtn.textContent = `Filter: Show All (${totalEngines})`;

  items.forEach(item => {
    const cb = item.querySelector('input[type="checkbox"]');
    item.style.display = cb && cb.checked ? 'flex' : 'none';
  });

  categories.forEach(cat => {
    let hasVisible = false;
    let sibling = cat.nextElementSibling;
    while (sibling && !sibling.classList.contains('engine-category')) {
      if (sibling.classList.contains('engine-item') && sibling.style.display !== 'none') {
        hasVisible = true;
        break;
      }
      sibling = sibling.nextElementSibling;
    }
    cat.style.display = hasVisible ? 'flex' : 'none';
  });
}

function updateUI() {
  const query = queryInput.value.trim();
  const selectedEngines = getSelectedEngines();

  // Update selected count badge and chips
  if (selectedCountBadge) {
    selectedCountBadge.textContent = selectedEngines.length;
  }
  renderSelectedChips(selectedEngines);
  applyGridFilter();

  // Update search button state
  const canSearch = query && selectedEngines.length > 0;
  searchBtn.disabled = !canSearch;

  // Update button text
  if (selectedEngines.length === 0) {
    searchBtnText.textContent = 'Select at least one engine';
  } else if (selectedEngines.length === 1) {
    const engineName = SEARCH_ENGINES[selectedEngines[0]]?.name || 'Unknown';
    searchBtnText.textContent = `Search on ${engineName}`;
  } else {
    searchBtnText.textContent = `Search on ${selectedEngines.length} engines`;
  }

  // Clear status if everything looks good
  if (canSearch) {
    showStatus('');
  }
}

async function handleSearch() {
  const query = queryInput.value.trim();
  const selectedEngines = getSelectedEngines();

  if (!query) {
    showStatus('Please enter a search term', 'error');
    queryInput.focus();
    return;
  }

  if (selectedEngines.length === 0) {
    showStatus('Please select at least one search engine', 'error');
    return;
  }

  // Show loading state
  setLoadingState(true);
  showStatus(`Opening ${selectedEngines.length} search ${selectedEngines.length === 1 ? 'tab' : 'tabs'}...`);

  try {
    // Ensure selected engines are saved
    await saveSelectedEngines();

    // Open all search tabs in the background first so the popup is not prematurely closed
    const encodedQuery = encodeURIComponent(query);
    const validEngines = selectedEngines.filter(engineId => SEARCH_ENGINES[engineId]);

    const tabPromises = validEngines.map(engineId => {
      const engine = SEARCH_ENGINES[engineId];
      const url = engine.url.replace('{query}', encodedQuery);
      return chrome.tabs.create({ url, active: false });
    });

    const createdTabs = await Promise.all(tabPromises);

    // Group tabs into a Chrome Tab Group if option is enabled by user
    const shouldGroup = groupTabsCheckbox ? groupTabsCheckbox.checked : true;
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
      } catch (groupErr) {
        console.warn('Tab grouping not available or failed:', groupErr);
      }
    }

    // Privacy: delete the stored search term so it doesn't reappear next time
    if (chrome.storage && chrome.storage.session) {
      try {
        await chrome.storage.session.remove(STORAGE_KEYS.lastQuery);
      } catch (e) {
        console.warn('Error removing query from session storage:', e);
      }
    }
    queryInput.value = '';
    updateUI();

    // Show success message
    showStatus(`Opened ${createdTabs.length} search ${createdTabs.length === 1 ? 'tab' : 'tabs'}`, 'success');

    // Close popup after a short delay, keeping all tabs in the background
    setTimeout(() => {
      window.close();
    }, 600);

  } catch (error) {
    console.error('Search error:', error);
    showStatus('Error opening search tabs', 'error');
  } finally {
    setLoadingState(false);
  }
}

function setLoadingState(loading) {
  searchBtn.disabled = loading;
  searchBtn.classList.toggle('loading', loading);

  if (loading) {
    searchBtnText.textContent = '';
  } else {
    updateUI();
  }
}

function showStatus(message, type = '') {
  statusDiv.textContent = message;
  statusDiv.className = `status ${type}`;

  // Clear status after a few seconds for non-error messages
  if (type !== 'error' && message) {
    setTimeout(() => {
      if (statusDiv.textContent === message) {
        statusDiv.textContent = '';
        statusDiv.className = 'status';
      }
    }, 3000);
  }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + A to select all engines
  if ((e.ctrlKey || e.metaKey) && e.key === 'a' && e.target !== queryInput) {
    e.preventDefault();
    selectAllBtn.click();
  }

  // Escape to clear input
  if (e.key === 'Escape') {
    if (queryInput.value) {
      queryInput.value = '';
      updateUI();
    } else {
      window.close();
    }
  }
});

// Focus the input when popup opens (handled inside DOMContentLoaded)