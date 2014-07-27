var meteorWindow = document.getElementById("meteorFrame").contentWindow;

sendMeteorMessage = function (obj) {
	meteorWindow.postMessage(obj,"*")
}

window.onmessage = function(e) {
	if (e.data["command"] == "log") {
		console.log("From Meteor: " + e.data["args"]["obj"])
	}
}



bgMessageHandler = function(ev) {
	console.log("Background received: " + JSON.stringify(ev));
	sendMeteorMessage(ev)
}



chrome.runtime.onMessage.addListener(bgMessageHandler);