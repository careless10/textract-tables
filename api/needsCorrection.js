import fs from "fs";
import list from "./list.js";

const needsCorrection = () => {
  const dir = fs.readdirSync("./processed");
  const formattedList = [];
  let all = [];
  for (const file of dir) {
    const readFile = fs.readFileSync("./processed/" + file);
    const parsed = JSON.parse(readFile);
    all = [...all, ...parsed.map((i) => i.words)];
  }
  const filtered = all.filter((i) => !list.find((j) => i === j));
  return [list, filtered];
};

export function allLabels() {
  const dir = fs.readdirSync("./processed");
  let all = [];
  for (const file of dir) {
    const readFile = fs.readFileSync("./processed/" + file);
    const parsed = JSON.parse(readFile);
    all = [...all, ...parsed.map((i) => i.words)];
  }
  const filtered = all.filter((i) => !list.find((j) => i === j));

  return filtered;
}

export default needsCorrection;
