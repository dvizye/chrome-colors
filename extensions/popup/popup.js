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
  	sendPageLoadMessage("http://www.google.com");
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

$('#colorSelector').ColorPicker({
	color: '#0000ff',
	onShow: function (colpkr) {
		$(colpkr).fadeIn(300);
		return false;
	},
	onHide: function (colpkr) {
		$(colpkr).fadeOut(300);
		return false;
	},
	onChange: function (hsb, hex, rgb) {
		$('#colorSelector div').css('backgroundColor', '#' + hex);
    document.getElementsByName('textInput')[0].placeholder=hex;
	}
});
