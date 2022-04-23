import fs, { existsSync, readFileSync, writeFile, writeFileSync } from "fs";
import list from "./list.js";

function process() {
  const dir = fs.readdirSync("./extracted");

  for (const file of dir) {
    const newFileName = file.replace(/-/g, "").split("T")[0] + ".json";
    if (existsSync(`./processed/${newFileName}`)) continue;
    const readFile = readFileSync("./extracted/" + file);
    const parsedFile = JSON.parse(readFile);
    const blocks = parsedFile.Blocks;
    const filteredBlocks = blocks.filter(isAcceptable);
    const processed = [];
    for (let i = 0; i < list.length; i++) {
      const qualities = {
        high: filteredBlocks[i * 3 + 2]?.Text,
        med: filteredBlocks[i * 3 + 1]?.Text,
        low: filteredBlocks[i * 3]?.Text,
      };
      processed.push({ name: list[i], qualities });
    }

    writeFileSync(
      "./processed/" + newFileName,
      JSON.stringify(processed),
      { flag: "w" },
      (err) => console.log(err)
    );
  }
}

function isAcceptable(block) {
  if (block.BlockType !== "WORD") return false;
  if (block.Geometry.BoundingBox.Left < 0.31) return false;
  const text = block.Text;
  var re = /^\d+[,.]+\d{3}/;
  const isWord = re.test(text);
  return isWord;
}

export default process;
