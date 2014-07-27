console = chrome.extension.getBackgroundPage().console;

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('testButton');
    link.addEventListener('click', click);
});

var meteorWindow = document.getElementById("meteorFrame").contentWindow;


function click(e) {
  // chrome.tabs.executeScript(null,
  //     {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  // window.close();
  	// meteorWindow.postMessage({"command":"pageLoad", "args": {"url":"http://google.com"}}, "*");
  	// sendPageLoadMessage("http://www.google.com");
    var settings = {
      field1: "TODO",
      field: "another"
    }
    console.log(settings);
    sendSaveMessage("http://www.google.com", settings)
}

window.onmessage = function(e) {
	if (e.data["command"] == "log") {
		console.log("From Meteor: " + e.data["args"]["obj"])
	}
}

sendPageLoadMessage = function(url) {
	var objToSend = {
		"command": "pageLoad",
		"args": {
			"url":url
		}
	};
	meteorWindow.postMessage(objToSend, "*");
}

// TODO: Send settings to server
sendSaveMessage = function(url, settings) {
  var objToSend = {
    "command": "save",
    "args": {
      "url": url,
      "scheme": settings,
    }
  };
  meteorWindow.postMessage(objToSend, "*");
}

sendDeltaMessage = function(url, deltas) {
	var objToSend = {
		"command" : "updateDelta",
		"args" : {
			"url" : url,
			"deltas" : deltas
		}
	};

	meteorWindow.postMessage(objToSend);
}
