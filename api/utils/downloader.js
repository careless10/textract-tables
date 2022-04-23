import fs, { existsSync } from "fs";
import path from "path";
import request from "request";
import urls from "./urls.js";

var download = function (uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    // console.log("content-type:", res.headers["content-type"]);
    // console.log("content-length:", res.headers["content-length"]);

    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
};
function downloader() {
  const filtered = urls;
  for (const item of filtered) {
    const fileName = `../images/${item.title}.jpg`;
    if (existsSync(`../images/${item.title}.jpg`)) continue;
    console.log(item.link);
    download(item.link, fileName, () =>
      console.log("Done downloading " + fileName)
    );
  }
}

downloader();
