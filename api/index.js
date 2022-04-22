import express from "express";
import extract from "./extract";
import formattedList from "./formattedList";
import process from "./process";
const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/extract", (req, res) => {
  extract();
  res.send("Done");
});

app.get("/api/process", (req, res) => {
  process();
  res.send("Done");
});

app.get("/api/list", (req, res) => {
  res.send(formattedList());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
