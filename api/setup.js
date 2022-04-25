import sqlite3 from "sqlite3";
import list from "./list";
import { allLabels } from "./needsCorrection";

const setup = () => {
  const db = new sqlite3.Database(
    "./corrections.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message);
      console.log("Connection successful");
    }
  );

  // db.run("DROP TABLE corrections");
  // db.run("CREATE TABLE corrections(incorrect,correct,line,unique (incorrect))");
  // db.close();
  // return;
  const sql = `INSERT OR IGNORE INTO corrections (incorrect,correct,prices,line,file) VALUES(?,?,?,?,?)`;
  // db.run(`DELETE FROM corrections`);
  db.on("error", function (error) {
    console.log("Getting an error : ", error);
  });

  db.all(`SELECT * FROM corrections`, (err, rows) => {
    if (rows.length === 0) {
      list.forEach((i) => {
        db.run(sql, [i, i, null, null]);
      });
      allLabels().forEach((i) => {
        db.run(sql, [i.words, null, JSON.stringify(i.prices), i.line, i.file]);
      });
    }
  });

  db.close();
};

export default setup;
