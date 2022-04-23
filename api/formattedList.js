import list from "./list";
import fs from "fs";
import path, { basename } from "path";

const formattedList = () => {
  const dir = fs.readdirSync("./processed");
  const formattedList = [];
  for (const file of dir.reverse()) {
    const readFile = fs.readFileSync("./processed/" + file);
    const parsed = JSON.parse(readFile);
    for (let i = 0; i < parsed.length; i++) {
      const element = parsed[i];
      let existing = formattedList.findIndex((i) => i.name === element.words);
      if (existing === -1) {
        formattedList.push({ name: element.words, qualities: [] });
        existing = formattedList.length - 1;
      }

      formattedList[existing].qualities.push({
        high: element.prices[0],
        med: element.prices[1],
        low: element.prices[2],
        order: path.parse(file).name.slice(4, 8),
      });
    }
  }
  return formattedList;
};

export default formattedList;
