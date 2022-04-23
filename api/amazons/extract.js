// Import required AWS SDK clients and commands for Node.js
import { AnalyzeDocumentCommand } from "@aws-sdk/client-textract";
import { TextractClient } from "@aws-sdk/client-textract";
import {
  existsSync,
  promises,
  readdirSync,
  writeFile,
  writeFileSync,
} from "fs";
import path from "path";

// Set the AWS Region.
const REGION = "us-west-2"; //e.g. "us-east-1"
// Create SNS service object.

async function extract() {
  // async/await.
  try {
    const dir = readdirSync("./images/");

    for (const file of dir) {
      const outputFile = path.parse(file).name + ".json";
      if (existsSync(`./extracted/${outputFile}`)) continue;
      const image = await base64_encode("./images/" + file);
      // console.log(image);
      const client = new TextractClient({
        // region: REGION,
      });
      const command = new AnalyzeDocumentCommand({
        Document: { Bytes: image },
        FeatureTypes: ["TABLES"],
      });
      const data = await client.send(command);

      writeFile(
        "./extracted/" + outputFile,
        JSON.stringify(data),
        {
          flag: "w",
        },
        (err) => console.log(err)
      );
    }
  } catch (error) {
    console.log(error);
    const { requestId, cfId, extendedRequestId } = error.$metadata;
    console.log({ requestId, cfId, extendedRequestId });
    // console.log(error);
    // error handling.
  } finally {
    // finally.
  }
}

async function base64_encode(file) {
  // read binary data
  var bitmap = await promises.readFile(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap, "base64");
}

export default extract;
