var meteorWindow = document.getElementById("meteorFrame").contentWindow;

sendMeteorMessage = function (obj) {
	console.log("sending to meteor", meteorWindow);
	meteorWindow.postMessage(obj,"*")
}



bgMessageHandler = function(ev) {
	console.log("Background received: " + JSON.stringify(ev));
	sendMeteorMessage(ev)
}



chrome.runtime.onMessage.addListener(bgMessageHandler);
