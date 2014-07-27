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

document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', click);
  }
});
