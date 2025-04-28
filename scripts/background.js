// Listening popup message, displaying window

chrome.runtime.onMessage.addListener(function (message) {
  if (message.action === "startTimer"){
    chrome.windows.create({
      url: "window.html",
      type: "popup",
      width: 300,
      height: 300,
    });
  }
});
