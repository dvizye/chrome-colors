var meteorWindow = document.getElementById("meteorFrame").contentWindow;

sendMeteorMessage = function (obj) {
	meteorWindow.postMessage(obj,"*")
}



bgMessageHandler = function(ev) {
	console.log("Background received: " + JSON.stringify(ev));
	sendMeteorMessage(ev)
}



chrome.runtime.onMessage.addListener(bgMessageHandler);