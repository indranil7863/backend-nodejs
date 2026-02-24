import { createReadStream } from "node:fs";
import net from "node:net";

const socket = net.createConnection({ host: "10.39.181.41", port: 4000 });

// socket.write("Client-2");

socket.on("data", (chunk) => {
  console.log(chunk.toString());
});

process.stdin.on("data", (input) => {
  const inputstr = input.toString().trim();
  console.log("input: ", typeof inputstr);
  if (inputstr === "send") {
    console.log("i'm inside");
    const readStream = createReadStream(
      "/home/indranil/Downloads/ep-72_callback-hell/final-code/index.html",
    );
    // readStream.on("data", (chunk) => {
    //   console.log(chunk);
    // });
    readStream.pipe(socket);

    readStream.on("end", () => {
      console.log("File sent!");
    });
  }
});

socket.on("error", () => {
  console.log("Connection error.");
});
