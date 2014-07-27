var console = {}
console.log = function(obj) {
	var objToSend = {
		"command":"log",
		"args" : {
			"obj":obj
		}
	};
	parent.postMessage(objToSend, "*");
}
var handler = function(e) {
  console.log("received message")
  parent.postMessage("hi too", "*");
}

window.addEventListener("message", handler)