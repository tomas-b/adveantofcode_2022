import { readFile } from "fs/promises";

const data = await readFile("./input", "utf8");
const input = data.split("");

const signalLength = 14;
let index = signalLength;
let possibleSignal = (data, index) => data.slice(index - signalLength, index);

const checkSignal = (signal) => {
  const unique = new Set(signal);
  return unique.size === signal.length;
};

while (index < data.length) {
  let signal = possibleSignal(input, index);
  if (checkSignal(signal)) {
    console.log({ index, signal: signal.join("") });
    break;
  }
  index++;
}
