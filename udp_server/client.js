import dgram from "node:dgram";

const socket = dgram.createSocket("udp4"); // it will emmite an event, so we can attach eventListener

socket.on("listening", () => {
  console.log("listening...");
  //   console.log(socket.address());
});

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  //   console.log(remoteAddress);
  socket.close();
});

socket.send("hi from Client.js", 4000, "10.21.202.41", () => {
  console.log("message sent");
});
