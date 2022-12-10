import { readFile } from "fs/promises";

const content = await readFile("input", "utf8");

const instructions = content
  .split("\n")
  .filter((line) => line)
  .map((line) => {
    const [op, arg] = line.split(" ");
    return { op, arg: Number(arg) };
  });

const opLengths = {
  noop: 1,
  addx: 2,
};

const registers = {
  X: 1,
};

const executionCycles = instructions.flatMap(({ op, arg }, i) => {
  const length = opLengths[op];
  return [...Array(length - 1).fill({ op: "noop" }), { op, arg }];
});

let row = [];

for (const [idx, { op, arg }] of executionCycles.entries()) {
  const index = idx + 1;

  const pixel = [registers.X - 1, registers.X, registers.X + 1].includes(
    row.length
  )
    ? "#"
    : ".";

  row.push(pixel);

  if (index % 40 === 0) {
    console.log(row.join(""));
    row = [];
  }

  switch (op) {
    case "addx":
      registers.X += arg;
      break;
    case "noop":
      break;
  }
}
