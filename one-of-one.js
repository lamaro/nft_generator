"use strict";

const fs = require("fs");

const idsIntervalMin = 1;
const idsIntervalMax = 5500;
const dir = {
  inputImages: `./layers/trait_types/00_1 of 1 generation/09_species`, //1of1 Input images name.png
  output: `./outputs/metadata/1of1`,
  metadata: `./outputs/metadata/1of1/matadata`,
  images: `./outputs/metadata/1of1/images`,
};

const recreateOutputsDir = () => {
  if (fs.existsSync(dir.output)) {
    fs.rmdirSync(dir.output, { recursive: true });
  }
  fs.mkdirSync(dir.output);
  fs.mkdirSync(dir.metadata);
  fs.mkdirSync(dir.images);
};

const generateFiles = () => {
  fs.readdir(dir.inputImages, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(function (inputFile) {
      const id =
        Math.floor(Math.random() * (idsIntervalMax - idsIntervalMin + 1)) +
        idsIntervalMin;

      fs.copyFile(
        `${dir.inputImages}/${inputFile}`,
        `${dir.images}/${id}.png`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          } else {
            console.log("copied", id);
            const oneOfOneName = inputFile.slice(0, -4);
            const attributes = [
              { trait_type: "Type", value: `Superbread` },
              { trait_type: "Name", value: `${oneOfOneName}` },
            ];
            fs.writeFileSync(
              `${dir.metadata}/${id}.json`,
              JSON.stringify({
                image: `${id}.png`,
                //   externalUrl: `https://domain/token/${loopIndex + 1}`,
                name: `Breadaverse #${id}`,
                description: `Breadaverse is a collection of absurdly fun, hand-drawn Breads that give you exclusive access to The Bakery where we're baking up the highest quality content in Web3, producing exciting community events, and creating innovative IRL and metaverse benefits for holders.`,
                attributes: attributes,
              }),
              function (err) {
                if (err) throw err;
              }
            );
          }
        }
      );
    });
  });
};

const main = () => {
  recreateOutputsDir();
  generateFiles();
};

main();
