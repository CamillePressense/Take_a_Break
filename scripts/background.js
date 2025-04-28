let popupWindowId = null;
let alwaysOnTopInterval = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "openWindow") {
    if (popupWindowId) {
      chrome.windows.update(popupWindowId, { focused: true }, (win) => {
        if (chrome.runtime.lastError) {
          createPopupWindow();
        }
        sendResponse({
          status: "success",
          message: "Window focused or opened",
        });
      });
    } else {
      createPopupWindow();
      sendResponse({ status: "success", message: "Window opened" });
    }
  } else if (message.action === "toggleAlwaysOnTop") {
    if (!message.enabled && alwaysOnTopInterval) {
      clearInterval(alwaysOnTopInterval);
      alwaysOnTopInterval = null;
    } else if (message.enabled && !alwaysOnTopInterval && popupWindowId) {
      alwaysOnTopInterval = setInterval(() => {
        if (popupWindowId) {
          chrome.windows.update(popupWindowId, { focused: true }, (win) => {
            if (chrome.runtime.lastError) {
              popupWindowId = null;
              clearInterval(alwaysOnTopInterval);
            }
          });
        }
      }, 1000);
    }
    sendResponse({ status: "success", message: "AlwaysOnTop toggled" });
  } else {
    sendResponse({ status: "error", message: "Action inconnue" });
  }

  return true;
});

function createPopupWindow() {
  chrome.windows.create(
    {
      url: "window.html",
      type: "popup",
      width: 200,
      height: 200,
    },
    (window) => {
      popupWindowId = window.id;
      alwaysOnTopInterval = setInterval(() => {
        if (popupWindowId) {
          chrome.windows.update(popupWindowId, { focused: true }, (win) => {
            if (chrome.runtime.lastError) {
              popupWindowId = null;
              clearInterval(alwaysOnTopInterval);
            }
          });
        }
      }, 1000);
    }
  );
}
