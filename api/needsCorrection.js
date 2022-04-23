import fs from "fs";
import list from "./list.js";
import sqlite3 from "sqlite3";

const needsCorrection = (res) => {
  const db = new sqlite3.Database(
    "./corrections.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message);
      console.log("Connection successful");
    }
  );

  db.all(
    `SELECT * FROM corrections WHERE correct IS NULL ORDER BY RANDOM() LIMIT 1`,
    (err, rows) => {
      res.send([list, rows]);
    }
  );

  db.close();
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
