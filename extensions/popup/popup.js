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
    console.log(JSON.stringify(e));
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

chrome.tabs.getSelected(null,function(tab) {
    var url = tab.url;
    start = url.indexOf('//')
    if (start == -1){
      start = 0
    }else {
      start = start + 2
    }

    end = url.indexOf('/', start);
    url = url.substring(start, end);
    window.setTimeout(function() {
      meteorWindow.postMessage({"command": "url", "args" : {"url" : url} }, "*");
    }, 250);
});
