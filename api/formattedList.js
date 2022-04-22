import list from "./list";
import fs from "fs";

const formattedList = () => {
  const dir = fs.readdirSync("./processed");
  const formattedList = list.map((i) => ({ name: i, qualities: [] }));
  for (const file of dir) {
    const readFile = fs.readFileSync("./processed/" + file);
    const parsed = JSON.parse(readFile);
    for (let i = 0; i < parsed.length; i++) {
      const element = parsed[i];
      formattedList[i].qualities.push(element.qualities);
    }
  }
  console.log("done");
  return formattedList;
};

export default formattedList;
