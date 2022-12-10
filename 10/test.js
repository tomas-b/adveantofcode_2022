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

const executionCycles = instructions.flatMap(({ op, arg }) => {
  const length = opLengths[op];
  return [...Array(length - 1).fill({ op: "noop" }), { op, arg }];
});

let signalStrengthSum = 0;
let nextIndexOfInterest = 20;

for (const [idx, { op, arg }] of executionCycles.entries()) {
  const index = idx + 1;

  if (index === nextIndexOfInterest) {
    const strength = index * registers.X;
    signalStrengthSum += strength;
    nextIndexOfInterest += 40;
  }

  switch (op) {
    case "addx":
      registers.X += arg;
      break;
    case "noop":
      break;
  }
}

console.log({ signalStrengthSum });
