Meteor.subscribe("schemes");

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
	var user = Users.findOne()
	console.log(user)
	console.log("Got pageload command " + args["url"])
}

commands = {
	"pageLoad":pageLoad
}


var handler = function(e) {
  command = e.data["command"]
  commands[command](e.data["args"])
}

window.addEventListener("message", handler)
