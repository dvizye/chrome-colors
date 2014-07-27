document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('testButton');
    link.addEventListener('click', click);
});

function click(e) {
  // chrome.tabs.executeScript(null,
  //     {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
  // window.close();
	var iframe = document.getElementById("meteorFrame");
	iframe.contentWindow.postMessage("hello there!", "*");
}

window.onmessage = function(e) {
	console.log("client received something")
	console.log(e.data)
}
