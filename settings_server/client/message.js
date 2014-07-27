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

pageLoad = function(args) {
	console.log("Got pageload command " + args["url"])
}

commands = {
	"pageLoad":pageLoad
}


var handler = function(e) {
  // console.log("received message " + e.data["command"])

  // parent.postMessage("hi too", "*");
  command = e.data["command"]
  commands[command](e.data["args"])
}

window.addEventListener("message", handler)