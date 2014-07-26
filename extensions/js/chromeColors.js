document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('testButton');
    // onClick's logic below:
    link.addEventListener('click', click);
});

function click(e) {
  chrome.tabs.executeScript(null,
      {code:"getBgColors();"});
  window.close();
}

window.onmessage=function(e){
  console.log("Opened");
  if (e.data) {
    console.log('I got data in my chrome extenssion', e.data);
  }
}

var iframe = document.getElementById("meteorFrame");

iframe.contentWindow.postMessage("hello there!", "*");
console.log("sent messag")
