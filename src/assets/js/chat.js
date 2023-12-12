var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
connection.start().then(function () {
  document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
  return console.error(err.toString());
});

connection.on("ReceiveMessage", function (user, message) {
  var msg = message.replace(/&/g, "&")
     .replace(//g, ">");
  var encodedMsg = user + " says " + msg;
  var li = document.createElement("li");
  li.textContent = encodedMsg;
  document.getElementById("messagesList").appendChild(li);
});
document.getElementById("sendButton").addEventListener("click", function (event) {
  var user = document.getElementById("userInput").value;
  var message = document.getElementById("messageInput").value;
  connection.invoke("SendMessage", user, message).catch(function (err) {
    return console.error(err.toString());
  });
  event.preventDefault();
});
