var handler = function(e) {
  console.log("received message")
  console.log(e.data)
}

window.addEventListener("message", handler)




