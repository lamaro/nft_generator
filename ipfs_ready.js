"use strict";

const fs = require("fs");

const IPFS_URL = `https://ipfs.com`;
const dir = {
  metadata: `./outputs/metadata`,
  output: `./outputs/metadata/ipfs`,
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
    fs.writeFileSync(
      `${dir.output}/${index}`,
      JSON.stringify({ ...nft, image: `${IPFS_URL}/${index}` }),
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
