import sqlite3 from "sqlite3";
import list from "./list";
import { allLabels } from "./needsCorrection";

const corrector = () => {
  const db = new sqlite3.Database(
    "./corrections.db",
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message);
      console.log("Connection successful");
    }
  );

  // db.run("CREATE TABLE corrections(incorrect,correct)");
  const sql = `INSERT INTO corrections (incorrect,correct) VALUES(?,?)`;
  //   db.run(`DELETE FROM corrections`);

  db.all(`SELECT * FROM corrections`, (err, rows) => {});

  db.close();
};

export default corrector;
