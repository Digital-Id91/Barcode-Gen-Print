chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "printBarcode",
      title: "Print Barcode",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "printBarcode" && info.selectionText) {
      // Open the popup as a new window, passing the selected text as a URL parameter
      chrome.windows.create({
        url: `popup.html?text=${encodeURIComponent(info.selectionText)}`,
        type: "popup",
        width: 600,  // Window width
        height: 700  // Window height
      });
    }
  });
  