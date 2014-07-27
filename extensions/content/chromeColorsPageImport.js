var extensionId = 'iilekcdmhflppfdganhnchlkanhbaneo'

onload = function() {
	console.log("onload");
	postColorMessage = function (colorList) {
		chrome.extension.sendMessage(extensionId, {"command":"colorList", "args":{}})
	}

	url = document.URL
	start = url.indexOf('//')
	if (start == -1){
		start = 0
	}else {
		start = start + 2
	}

	end = url.indexOf('/', start)
	url = url.substring(start, end)

	chrome.extension.sendMessage(extensionId, {"command":"pageLoad", "args": {"url":url, "colors":getBgColors()}});
	console.log("Test Import");
}

// Return all of the background-color values
var getBgColors = function(){
  // Stores the colors and the number of occurrences
  var colors = {};
  // Get all the nodes on a page
  var nodes = document.querySelectorAll('*');
  // Instantiate variables we'll use later
  var node, nodeArea, bgColor, i;

  // Loop through all the nodes
  for (i = 0; i < nodes.length; i++) {
    // The current node
    node = nodes[i];
    // The area in pixels occupied by the element
    nodeArea = node.clientWidth * node.clientHeight;
    // The computed background-color value
    bgColor = window.getComputedStyle(node)['background-color'];
    fgColor = window.getComputedStyle(node)['color'];
    // Strip spaces from the color for succinctness
    bgColor = bgColor.replace(/ /g, '');
    fgColor = fgColor.replace(/ /g, '');
    // If the color is not white or fully transparent...
    if (
      !(bgColor.indexOf('rgba') === 0 && bgColor.substr(-3) === ',0)')
    ) {
      // ...set or override it in the colors object,
      // adding the current element area to the
      // existing value.
      colors["bg_" + bgColor] = (colors[bgColor] >> 0) + nodeArea;
      colors["fg_" + fgColor] = (colors[fgColor] >> 0) + nodeArea;
      node.className = node.className + " bg_" + bgColor;
      node.className = node.className + " fg_" + fgColor;
    }
  }

  // Sort and return the colors by
  // total area descending
  var ret = Object.getOwnPropertyNames(colors).sort(function (a, b) {
    return colors[b] - colors[a];
  });
  return ret;
}

setColor = function(colorClass, newColor) {
	elList = document.getElementByClassName(colorClass)
	for (idx = 0; idx < elList.length; idx++) {
		el = elList[idx];
		if (colorClass.indexOf("bg_") == 0) {
			el.style['background-color'] = newColor;
		} else if (colorClass.indexOf("fg_") == 0) {
			el.style['color'] = newColor
		}
	}
}

setColors = function(map) {
	keys = Object.keys(map)
	for (key in keys) {
		setColors(key, map[key])
	}
}

commands = {
	"setColors" : setColors
}

contentMessageHandler = function (ev) {
	console.log("Content Received: " + JSON.stringify(ev))
}

onload();
chrome.runtime.onMessage.addListener(contentMessageHandler);
