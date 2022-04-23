import fs, { existsSync, readFileSync, writeFile, writeFileSync } from "fs";
import list from "./list.js";

function process() {
  const dir = fs.readdirSync("./extracted");
  const minX = 200;

  for (const file of dir) {
    const newFileName = file.replace(/-/g, "").split("T")[0] + ".json";
    if (existsSync(`./processed/${newFileName}`)) continue;
    const readFile = readFileSync("./extracted/" + file);
    const parsedFile = JSON.parse(readFile);
    let lines = [];
    for (const [key, block] of parsedFile.entries()) {
      const {
        boundingPoly: { vertices },
      } = block;
      const line = vertices[0].y;
      if (key == 0 || minX >= vertices[1].x) continue;
      let existingLine = lines.find((item) => {
        return Math.abs(item.line - line) <= 9;
      });

      if (!existingLine) {
        lines.push({ line, words: "", prices: [] });
        existingLine = lines[lines.length - 1];
      }

      formatBeforePush(existingLine, block);
    }
    lines = lines.filter((i) => i.words !== "" && i.prices.length !== 0);

    writeFileSync(
      "./processed/" + newFileName,
      JSON.stringify(lines),
      { flag: "w" },
      (err) => console.log(err)
    );
  }
}

function formatBeforePush(arr, block) {
  const { description } = block;
  const arabic = /[\u0600-\u06FF]/;
  var price = /^\d+[,.]+\d{3}/;
  if (arabic.test(description)) {
    if (arr.words.length > 0) arr.words += ` `;
    arr.words += `${description}`;
  }
  if (price.test(description)) {
    arr.prices.push(description);
  }
}

export default process;
