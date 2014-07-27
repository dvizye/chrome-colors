Schemes = Meteor.subscribe('schemes');

user = Meteor.user()

// var console = {}
// console.log = function(obj) {
// 	var objToSend = {
// 		"command":"log",
// 		"args" : {
// 			"obj":obj
// 		}
// 	};
// 	parent.postMessage(objToSend, "*");
// }

pageLoad = function(args) {
	var url = args.url;
	// Need base url
	if (user.urls) {
			var schemeId = user.urls[url];
			var scheme = Schemes.find({name: schemeId}).fetch();
	}
	parent.postMessage(scheme, "*");
	// console.log(JSON.stringify(user))
	console.log("Got pageload command " + args["url"]);
}

save = function(args) {
	var url = args.url;
	var scheme = args.scheme;
	scheme["name"] = user._id + url
	console.log(Schemes.find());
	// Schemes.insert(scheme);
	for (var key in scheme) {
		if (scheme.hasOwnProperty(key) && key != "name"){
			var doc = Schemes.findOne({schemeName: scheme.name, key: key})
			if (!doc) {
				Schemes.insert({name: scheme.name,
												key: key,
												value: scheme[key]})
			} else {
				Scheme.update(doc._id, {$set: {name: scheme.name,
																			 key: key,
																			 value: scheme[key]}})
			}
		}
	}
	console.log("schemes: ", Schemes.find().fetch());
	console.log("Got save command");
}

commands = {
	"pageLoad":pageLoad,
	"save":save,
}


var handler = function(e) {
  command = e.data["command"]
  commands[command](e.data["args"])
}

window.addEventListener("message", handler)
