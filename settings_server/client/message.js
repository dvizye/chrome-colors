window.addEventListener("message", handler)
 if (parent) {
 Notifications.find().observe({
   added: function (doc) {
     parent.postMessage(JSON.stringify(doc), "*");
   }
 });
}
console.log("runin2")
var handler = function(e) {
  console.log("received message")
  console.log(e.data)
}

window.onmessage = function(e) {
  alert(e.data)
  console.log("also con")
}
