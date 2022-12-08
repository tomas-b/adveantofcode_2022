import { readFile } from "fs/promises";

const data = await readFile("./input", "utf8");

const parse = (data) => {
  let [stacks, moves] = data.split("\n\n");

  stacks = stacks
    .split("\n")
    .slice(0, -1)
    .map((line) => line.split("").filter((c, index) => (index - 1) % 4 === 0));

  // rotate matrix
  stacks = stacks[0]
    .map((_, index) => stacks.map((row) => row[index]))
    .map((stack) => stack.reverse().filter((c) => c !== " "));

  moves = moves
    .split("\n")
    .filter((line) => line)
    .map((line) => {
      const [, move, , from, , to] = line.split(" ");
      return { move, from, to };
    });

  return [stacks, moves];
};

const [stacks, moves] = parse(data);

 for(let {move, from, to} of moves) {
  const poppedElements = stacks[from-1].splice(-move);
  stacks[to-1].push(...poppedElements)
 }

 const response = stacks.map(stack => stack.at(-1)).join("")

console.log({ stacks, moves, response });
