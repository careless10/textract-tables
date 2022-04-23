import fs, { existsSync, readFileSync, writeFile, writeFileSync } from "fs";
import list from "./list.js";

function process() {
  const dir = fs.readdirSync("./extracted");

  for (const file of dir) {
    const newFileName = file.replace(/-/g, "").split("T")[0] + ".json";
    if (existsSync(`./processed/${newFileName}`)) continue;
    const readFile = readFileSync("./extracted/" + file);
    const parsedFile = JSON.parse(readFile);
    let lines = [];
    for (const [key, block] of parsedFile.entries()) {
      if (key == 0) continue;
      const {
        boundingPoly: { vertices },
      } = block;
      const line = vertices[0].y;
      let existingLine = lines.find((item) => {
        return Math.abs(item.line - line) <= 4;
      });

      if (!existingLine) {
        lines.push({ line, words: "", prices: [] });
        existingLine = lines[lines.length - 1];
      }

      formatBeforePush(existingLine, block.description);
    }
    lines = lines.filter((i) => i.words !== "" || i.prices.length !== 0);
    writeFileSync(
      "./processed/" + newFileName,
      JSON.stringify(lines),
      { flag: "w" },
      (err) => console.log(err)
    );
  }
}

function formatBeforePush(arr, text) {
  const arabic = /[\u0600-\u06FF]/;
  var price = /^\d+[,.]+\d{3}/;
  if (text.includes("شد")) return;
  if (arabic.test(text)) {
    arr.words += ` ${text}`;
  }
  if (price.test(text)) {
    arr.prices.push(text);
  }
}

export default process;
