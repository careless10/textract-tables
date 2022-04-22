import vision from "@google-cloud/vision";
import fs from "fs";
import path from "path";

async function extract() {
  const dir = fs.readdirSync("./images/");
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  for (const file of dir) {
    // Performs text detection on the local file
    const [result] = await client.textDetection("./images/" + file);
    const detections = result.textAnnotations;
    const fileName = path.parse(file).name;

    fs.writeFileSync(
      `./extracted/${fileName}.json`,
      JSON.stringify(detections)
    );
  }
}

extract();
