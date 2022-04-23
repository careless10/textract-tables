import list from "./list";
import fs from "fs";
import path, { basename } from "path";

const formattedList = () => {
  const dir = fs.readdirSync("./processed");
  const formattedList = list.map((i) => ({ name: i, qualities: [] }));
  for (const file of dir.reverse()) {
    const readFile = fs.readFileSync("./processed/" + file);
    const parsed = JSON.parse(readFile);
    for (let i = 0; i < parsed.length; i++) {
      const element = parsed[i];
      formattedList[i].qualities.push({
        ...element.qualities,
        order: path.parse(file).name.slice(4, 8),
      });
    }
  }
  return formattedList;
};

export default formattedList;
