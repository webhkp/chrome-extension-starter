chrome.action.onClicked.addListener((tab) => {
  copyPageInfo(tab);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "copyPageInfo",
    title: "Copy Page Title & URL ",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copyPageInfo") {
    copyPageInfo(tab);
  }
});

chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "copy_page_info") {
    copyPageInfo(tab);
  }
});

function copyPageInfo(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: copyToClipboard
  });
}

function copyToClipboard() {
  const textToCopy = `${document.title} - ${window.location.href}`;
  const textarea = document.createElement("textarea");
  textarea.value = textToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const message = document.createElement("div");
  message.textContent = "Copied to clipboard!";
  message.style.position = "fixed";
  message.style.top = "10px";
  message.style.right = "10px";
  message.style.background = "black";
  message.style.color = "white";
  message.style.padding = "10px 20px";
  message.style.borderRadius = "5px";
  message.style.zIndex = "1000";
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 2000);
}
