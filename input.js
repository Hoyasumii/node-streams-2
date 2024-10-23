import { Writable } from "node:stream";
import { print } from "./print.js";

function input(message) {
  return new Promise((resolve) => {
    let target;

    if (typeof message !== "string")
      throw new Error("Message must be a String");

    print(message);

    let writableStream = new Writable({
      write(chunk, _, callback) {
        target = chunk.toString();
        callback();
      },
      final(callback) {
        resolve(target);
        callback();
      },
    });

    process.stdin.pipe(writableStream);

    process.stdin.on("data", (chunk) => {
      const inputString = chunk.toString();

      if (inputString.includes("\n")) {
        target = chunk.toString().replace("\n", "");
        writableStream.end();
        resolve(target.slice());
      }
    })

    process.stdin.on("end", () => {
      writableStream.end();
    });
  });
}

(async () => {
  const name = await input("Me fale o seu nome: ");
  const age = await input("Me fale a sua idade: ");

  console.log(name, age)

})()
