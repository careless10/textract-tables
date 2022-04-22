import list from "./list";
import fs from "fs";

const formattedList = () => {
  const dir = fs.readdirSync("./processed");
  const formattedList = list.map((i) => ({ name: i, qualities: [] }));
  let readingFile = 0;
  for (const file of dir.reverse()) {
    const readFile = fs.readFileSync("./processed/" + file);
    const parsed = JSON.parse(readFile);
    for (let i = 0; i < parsed.length; i++) {
      const element = parsed[i];
      formattedList[i].qualities.push({
        ...element.qualities,
        order: readingFile,
      });
    }
    readingFile++;
  }
  return formattedList;
};

export default formattedList;
