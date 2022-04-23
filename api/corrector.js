import sqlite3 from "sqlite3";
import list from "./list";
import needsCorrection, { allLabels } from "./needsCorrection";

const corrector = (incorrect, correct, res) => {
  const db = new sqlite3.Database(
    "./corrections.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message);
      console.log("Connection successful");
    }
  );

  if (correct === undefined) {
  } else {
    const sql = `UPDATE corrections SET correct=? WHERE incorrect=?`;

    db.run(sql, [correct, incorrect], (err, res) => {});
  }

  // db.all(
  //   `SELECT * FROM corrections WHERE incorrect='${incorrect}'`,
  //   (err, res) => {
  //     console.log(err);
  //     console.log(res);
  //   }
  // );

  // db.all(`SELECT * FROM corrections `, (err, rows) => {
  //   console.log(rows);
  // });

  db.close();
  res.send("Thanks");
};

export default corrector;
