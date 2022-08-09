// Saves options to chrome.storage
function save_options() {
  const clickAction = document.getElementById("clickAction").value;
  chrome.storage.local.set({ clickAction: clickAction }, function () {
    // Update status to let user know options were saved.
    const status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function () {
      status.textContent = "";
    }, 750);
  });
}

// Restores state using the preferences stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({ clickAction: "refresh-tabs" }, function (items) {
    const action = items.clickAction;
    document.getElementById(action).selected = true;
  });
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
