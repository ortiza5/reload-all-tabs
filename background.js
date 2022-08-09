// Set an initial value for settings on install
function refreshAllTabs() {
  // Get all tabs
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.reload(tab.id);
    });

    // notify completion
    flashBadge("✓", 3000);
  });
}

function flashBadge(symbol, duration) {
  chrome.action.setBadgeText({ text: symbol }, () => {
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, duration);
  });
}

// Keyboard shortcut listner
chrome.commands.onCommand.addListener((command) => {
  if (command === "refresh-tabs") {
    refreshAllTabs();
  }
});

// Extension icon click listener
chrome.action.onClicked.addListener(() => {
  refreshAllTabs();
});
