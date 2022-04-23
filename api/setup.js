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

  // db.run(s"DROP TABLE corrections");
  // db.run(
  //   "CREATE TABLE corrections(incorrect,correct,unique (incorrect, correct))"
  // );
  // db.close();
  // return;
  const sql = `INSERT INTO corrections (incorrect,correct) VALUES(?,?)`;
  // db.run(`DELETE FROM corrections`);

  db.all(`SELECT * FROM corrections`, (err, rows) => {
    console.log(rows);
    if (rows.length === 0) {
      list.forEach((i) => {
        db.run(sql, [i, i]);
      });
      allLabels().forEach((i) => {
        db.run(sql, [i, null]);
      });
    }
  });

  db.close();
};

export default setup;
