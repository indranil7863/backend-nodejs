import dgram from "node:dgram";

const socket = dgram.createSocket("udp4"); // it will emmite an event, so we can attach eventListener

socket.on("listening", () => {
  console.log("listening...");
  //   console.log(socket.address());
});

socket.on("message", (message, remoteAddress) => {
  console.log(message.toString());
  //   console.log(remoteAddress);
  socket.send(
    "Message Received Successfully on Server",
    remoteAddress.port,
    remoteAddress.address,
  );
});

socket.bind(4000, () => {
  //   console.log(socket.address());
});
