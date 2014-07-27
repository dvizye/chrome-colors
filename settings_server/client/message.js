Schemes = Meteor.subscribe('schemes');

user = Meteor.user()
console.log("hello", JSON.stringify(user));

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
var schemeName = function(url){
	console.log(JSON.stringify(user));
	return url
}

var classNameToHex = function(className) {
		var rgb = className.split(",");
		// Strip "bg_"
		var first = rgb[0];
		var last = rgb[2];
		rgb[0] = first.substring(7, first.length);
		rgb[2] = last.substring(0, last.length-1);
		var hexString = "#";
		for (val in rgb){
			var appendString = parseInt(rgb[val]).toString(16);
			if (appendString.length == 1) {
				appendString = "0" + appendString;
			}
			hexString += appendString
		}
		return hexString;
}

pageLoad = function(args) {
	console.log("pageLoad");
	var url = args.url;
	// Create new schemeId by default
	var schemeId = schemeName(url);
	// If user already has scheme for baseUrl, load that instead
	if (!user["urls"]) {
		user["urls"] = {
			urls: schemeId
		};
	}
	// Get schemeId stored for the user
	if (user.urls[url]) {
		schemeId = user.urls[url];
	} else {
		user.urls[url] = schemeId;
	}
	// Build map of className --> hex value based on stored scheme
	// Update scheme if nothing is stored for className
	var map = {};
	for (c in args.colors) {
		var color = args.colors[c];
		var match = Schemes.findOne({schemeName: schemeId, key: color});
		if (match) {
			map[color] = match.value
		} else {
			Schemes.insert({name: schemeId,
											key: color,
											value: classNameToHex(color)
			});
			map[color] = classNameToHex(color);
		}
	}
	return map;
	parent.postMessage(map, "*");
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

colorList = function(args) {

}

commands = {
	"pageLoad":pageLoad,
	"save":save,
	"colorList":colorList,
}


var handler = function(e) {
  command = e.data["command"]
  commands[command](e.data["args"])
}

window.addEventListener("message", handler)
