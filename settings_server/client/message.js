var handler = function(e) {
  console.log("meteor received message")
  console.log(e.data);
  console.log(parent)
  parent.postMessage("hi too", "*");
}

window.addEventListener("message", handler)