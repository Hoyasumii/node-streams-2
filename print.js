import { Readable, Writable } from "node:stream";

export function print(message) {
  if (typeof message !== "string") throw new Error("Message must be a String");

  const output = new Readable({
    read() {
      this.push(message);
      this.push(null);
    },
  });

  output.pipe(new Writable({
    write(chunk, _, callback) {
      process.stdout.write(chunk.toString());
      callback();
    }
  }));
}
