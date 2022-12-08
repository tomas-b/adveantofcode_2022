import { readFile } from "fs/promises";

const data = await readFile("input", "utf8");
// const data = await readFile("demo", "utf8");
const commands = data.split("$").filter((cmd) => cmd);

let currentPath = ".";
let fileThree = {};

console.log({ commands });
// process.exit()

for (const cmd of commands) {
  const cmdLine = cmd.trim().split("\n")[0];
  const results = cmd.trim().split("\n").slice(1).join("\n");
  const [command, ...args] = cmdLine.split(" ");

  console.log(`${currentPath} $ ${cmdLine}`);

  if (command === "cd") {
    if (args[0] === "..") {
      currentPath = currentPath.split("/").slice(0, -1).join("/");
      continue;
    }
    if (args[0].at(0) === "/") {
      currentPath = args[0];
      continue;
    }
    currentPath =
      currentPath.at(-1) === "/"
        ? `${currentPath}${args[0]}`
        : `${currentPath}/${args[0]}`;
  }
  if (command === "ls") {
    const files = results
      .split("\n")
      .map((fileStr) => fileStr.split(" "))
      .filter(([type]) => type !== "dir");

    for (const [size, file] of files) {
      fileThree[
        `${currentPath.at(-1) === "/" ? currentPath : currentPath + "/"}${file}`
      ] = parseInt(size);
    }
  }
}

const pathsSize = {};

for (const [file, size] of Object.entries(fileThree)) {
  let path = file;
  while (path !== "/") {
    path = path.split("/").slice(0, -1).join("/");
    path = path === "" ? "/" : path;
    pathsSize[path] = (pathsSize[path] || 0) + size;
  }
}

let totalDiskSpace = 70000000;
let neededSpace = 30000000;
let totalUsedSpace = pathsSize["/"];
let unusedSpace = totalDiskSpace - totalUsedSpace;
let needToFree = neededSpace - unusedSpace;

console.log({
  totalDiskSpace,
  neededSpace,
  totalUsedSpace,
  unusedSpace,
  needToFree,
});

const orderedBySize = Object.entries(pathsSize).sort((a, b) => a[1] - b[1]);

console.log({
  orderedBySize,
  firstThatFits: orderedBySize.find(([path, size]) => size >= needToFree),
});
