"use strict";

const fs = require("fs");

const IPFS_URL = `https://ipfs.com`;
const dir = {
  metadata: `./outputs/metadata`,
  output: `./outputs/metadata/meta_fix`,
};
const length = fs.readdirSync(dir.metadata).length; //One less for the ipfs folder

const recreateOutputsDir = () => {
  if (fs.existsSync(dir.output)) {
    fs.rmdirSync(dir.output, { recursive: true });
  }
  fs.mkdirSync(dir.output);
};

const generateFiles = () => {
  for (let index = 1; index < length; index++) {
    const rawdata = fs.readFileSync(`${dir.metadata}/${index}.json`);
    const nft = JSON.parse(rawdata);

    const attributes = nft.attributes;

    let isLucha = false;
    attributes.forEach((element) => {
      if (element.value === "Lucha") {
        isLucha = true;
      }
    });

    if (isLucha) {
      console.log("old", nft);
      attributes[0] = { trait_type: "Background", value: "Yellow" };
    }
    console.log("new", attributes);

    fs.writeFileSync(
      `${dir.output}/${index}.json`,
      JSON.stringify({ ...nft, attributes }),
      function (err) {
        if (err) throw err;
      }
    );
  }
};

const main = () => {
  recreateOutputsDir();
  generateFiles();
};

main();
