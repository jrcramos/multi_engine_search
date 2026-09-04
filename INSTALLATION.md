# Installation Guide

This guide provides detailed instructions for installing Multi-Engine Search Pro on different browsers and platforms.

![Multi-Engine Search Pro](screenshots/main-interface.png)

*Your powerful multi-engine search tool, ready to install*

## 🌐 Browser Compatibility

| Browser | Status | Version Required |
|---------|--------|------------------|
| Google Chrome | ✅ Fully Supported | Chrome 88+ |
| Microsoft Edge | ✅ Fully Supported | Edge 88+ |
| Mozilla Firefox | 🔄 Coming Soon | - |
| Safari | 📅 Planned | - |
| Opera | 📅 Planned | - |

## 📦 Installation Methods

### Method 1: Chrome Web Store (Recommended)
*🚧 Coming Soon - Extension is currently in development*

Once published, you'll be able to:
1. Visit the Chrome Web Store
2. Search for "Multi-Engine Search Pro"
3. Click "Add to Chrome"
4. Confirm installation

### Method 2: Manual Installation (Developer Mode)

#### For Google Chrome

1. **Download the Extension**
   - Option A: Download ZIP from GitHub
     ```
     https://github.com/jrcramos/multi_engine_search/archive/main.zip
     ```
   - Option B: Clone with Git
     ```bash
     git clone https://github.com/jrcramos/multi_engine_search.git
     ```

2. **Extract Files** (if downloaded as ZIP)
   - Extract the ZIP file to a folder on your computer
   - Remember the location (e.g., `C:\Extensions\multi_engine_search`)

3. **Open Chrome Extensions Page**
   - Type `chrome://extensions/` in your address bar
   - Or go to Menu → More Tools → Extensions

4. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner
   - This enables the "Load unpacked" button

5. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to and select the extension folder
   - Click "Select Folder"

6. **Verify Installation**
   - The extension should appear in your extensions list
   - You should see "Multi-Engine Search Pro" with version 2.0
   - The extension icon should appear in your toolbar

#### For Microsoft Edge

1. **Download the Extension** (same as Chrome steps 1-2)

2. **Open Edge Extensions Page**
   - Type `edge://extensions/` in your address bar
   - Or go to Menu → Extensions

3. **Enable Developer Mode**
   - Toggle "Developer mode" in the left sidebar

4. **Load the Extension**
   - Click "Load unpacked"
   - Select the extension folder
   - Click "Select Folder"

5. **Verify Installation** (same as Chrome step 6)

## 🔧 Post-Installation Setup

### Pin the Extension
To keep the extension easily accessible:

**Chrome:**
1. Click the extensions puzzle icon (🧩) in the toolbar
2. Find "Multi-Engine Search Pro"
3. Click the pin icon (📌) next to it

**Edge:**
1. Click the extensions icon (...) in the toolbar
2. Find "Multi-Engine Search Pro" 
3. Click the eye icon (👁️) to show in toolbar

### Configure Permissions
The extension requires these permissions:
- **Tabs**: To open search results in new tabs
- **Storage**: To remember your preferences

No additional permissions are needed or requested.

## ✅ Verifying Installation

### Quick Test
1. Click the Multi-Engine Search Pro icon in your toolbar
2. You should see the popup with:
   - Search input field
   - List of search engines organized in categories
   - "Select All" and "Clear All" buttons
   - "Search Selected Engines" button

### Full Functionality Test
1. Enter a test search term (e.g., "test search")
2. Select 2-3 search engines
3. Click "Search Selected Engines"
4. Verify that new tabs open with search results

## 🔄 Updating the Extension

### Manual Updates (Developer Mode)
1. Download the latest version from GitHub
2. Extract to the same folder (overwriting old files)
3. Go to `chrome://extensions/` or `edge://extensions/`
4. Click the refresh icon (🔄) on the extension card

### Automatic Updates (Chrome Web Store)
*Once published on the Chrome Web Store, updates will be automatic*

## 🐛 Troubleshooting Installation

### Extension Not Appearing
- **Check Developer Mode**: Ensure it's enabled
- **Refresh Extensions Page**: Try reloading the page
- **Clear Browser Cache**: Clear cache and restart browser
- **Check File Permissions**: Ensure files aren't blocked by antivirus

### "Load unpacked" Not Working
- **Folder Selection**: Make sure you select the correct folder containing `manifest.json`
- **File Structure**: Verify all files are present:
  ```
  multi_engine_search/
  ├── manifest.json
  ├── popup.html
  ├── popup.js
  └── icons/icon16.png
  ```

### Popup Not Opening
- **Right-click Icon**: Try right-clicking and selecting "Multi-Engine Search Pro"
- **Check Permissions**: Verify the extension has necessary permissions
- **Reload Extension**: Disable and re-enable the extension

### Search Not Working
- **Check Console**: Open Developer Tools (F12) and check for errors
- **Test Internet**: Verify you have an active internet connection
- **Try Different Engines**: Test with different search engines

## 🔒 Security Considerations

### Safe Installation
- Only download from official sources (GitHub repository)
- Verify file integrity if concerned about tampering
- Review permissions before installation

### Privacy Notes
- Extension only accesses search engine URLs you explicitly use
- No data is sent to third parties
- Search terms are stored locally for convenience only

## 📞 Getting Help

If you encounter issues during installation:

1. **Check This Guide**: Review the troubleshooting section
2. **GitHub Issues**: [Report installation problems](https://github.com/jrcramos/multi_engine_search/issues)
3. **Browser Documentation**: 
   - [Chrome Extension Installation](https://support.google.com/chrome_webstore/answer/2664769)
   - [Edge Extension Installation](https://support.microsoft.com/en-us/microsoft-edge/add-turn-off-or-remove-extensions-9c0ec68c-2fbc-2f2c-9ff0-bdc76f46b026)

## 🎉 Welcome!

Once installed, you're ready to experience the power of multi-engine search! Check out the main README.md for usage instructions and features.