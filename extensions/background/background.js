console = chrome.extension.getBackgroundPage().console;

bgMessageHandler = function(ev) {
	console.log("message received: " + JSON.stringify(ev));
}

chrome.runtime.onMessage.addListener(bgMessageHandler);