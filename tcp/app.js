import { createWriteStream } from "node:fs";
import net from "node:net";

const server = net.createServer();

const ClientList = [];
process.stdin.on("data", (input) => {
  const inputStr = input.toString();
  const [clientNo] = inputStr.split(" ");

  if (parseInt(clientNo) <= ClientList.length) {
    console.log(parseInt(clientNo));
    ClientList[parseInt(clientNo)].write(inputStr.substring(1));
  } else {
    ClientList.forEach((socket) => {
      socket.write(input.toString());
    });
  }
});

server.on("connection", (socket) => {
  ClientList.push(socket);
  let ct = 0;
  socket.on("data", (chunk) => {
    console.log(++ct);
    console.log(chunk.toString());
  });
  const writeStream = createWriteStream("notes.html");
  socket.pipe(writeStream);

  console.log("Client Connected: ", socket.remoteAddress);

  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client disconnected");
  });

  socket.on("error", () => {
    console.log("Connection Error");
  });
});

server.listen(4000, "0.0.0.0", () => {
  console.log("Server started on port 4000");
});
