//step 6

const fs = require("fs");
const esort = require("external-sorting").default;

async function sortByAfinnScore() {
  try {
    const inputFile = "./Cell_Phones_and_Accessories.ndjson";
    const tempFile = "./Cell_Phones_and_Accessories_temp.ndjson";

    await esort({
      input: fs.createReadStream(inputFile), 
      output: fs.createWriteStream(tempFile), 
      tempDir: __dirname, 
      deserializer: JSON.parse, 
      serializer: JSON.stringify, 
      maxHeap: 1000
    })
      .asc([
        (obj) => obj.afinnScore 
      ]);

    fs.renameSync(tempFile, inputFile);

    console.log("Sorting complete. File has been updated.");
    
  } catch (err) {
    console.error("Error during sorting:", err);
  }
}

sortByAfinnScore();
