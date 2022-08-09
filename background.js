// Set an initial value for settings on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ clickAction: "refresh-tabs" }, function () {
    console.log("Initial setting set...");
  });
});

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

function selectAllTabs() {
  // Get all tabs
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    chrome.tabs.highlight({ tabs: Array.from(Array(tabs.length).keys()) });

    // tabs.forEach((tab) => {
    //   chrome.tabs.update(tab.id, { selected: true });
    // });

    // tabs.forEach((tab) => {
    //   chrome.tabs.update(tab.id, { highlighted: true });
    // });

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
  } else if (command === "select-tabs") {
    // BUG: selecting doesn't work, refresh only for now
    refreshAllTabs();
    // selectAllTabs();
  }
});

// Extension icon click listener
chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get({ clickAction: "refresh-tabs" }, (items) => {
    const action = items.clickAction;

    if (action === "refresh-tabs") {
      refreshAllTabs();
    } else if (action === "select-tabs") {
      // BUG: selecting doesn't work, refresh only for now
      refreshAllTabs();
      // selectAllTabs();
    }
  });
});

// Open the options on install
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.runtime.openOptionsPage();
// });
