import fs, { readFileSync, writeFile, writeFileSync } from "fs";
import list from "./list.js";

function process() {
  const dir = fs.readdirSync("./extracted");

  for (const file of dir) {
    const readFile = readFileSync("./extracted/" + file);
    const parsedFile = JSON.parse(readFile);
    const blocks = parsedFile.Blocks;
    const filteredBlocks = blocks.filter(isAcceptable);
    const processed = [];
    for (let i = 0; i < list.length; i++) {
      const qualities = {
        high: filteredBlocks[i * 3]?.Text,
        med: filteredBlocks[i * 3 + 1]?.Text,
        low: filteredBlocks[i * 3 + 2]?.Text,
      };
      processed.push({ name: list[i], qualities });
    }
    writeFileSync(
      "./processed/" + file,
      JSON.stringify(processed),
      { flag: "w" },
      (err) => console.log(err)
    );
  }
}

function isAcceptable(block) {
  if (block.BlockType !== "WORD") return false;
  if (block.Geometry.BoundingBox.Left < 0.3) return false;
  const text = block.Text;
  var re = /^\d+[,.]+\d{3}/;
  const isWord = re.test(text);
  return isWord;
}

export default process;
