console = chrome.extension.getBackgroundPage().console;

bgMessageHandler = function(ev) {
	console.log("Background received: " + JSON.stringify(ev));
	// chrome.extension.sendMessage()
}

chrome.runtime.onMessage.addListener(bgMessageHandler);