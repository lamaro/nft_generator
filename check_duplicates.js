"use strict";

const fs = require("fs");

const dir = {
  metadata: `./outputs/metadata`,
//   metadata_new: `./outputs/metadata-new`,
  metadata_new: `./outputs/metadata`,
  output: `./outputs/metadata/duplicates`,
};
const lengthNew = fs.readdirSync(dir.metadata_new).length; //One less for the ipfs folder
const length = fs.readdirSync(dir.metadata).length; //One less for the ipfs folder

const recreateOutputsDir = () => {
  if (fs.existsSync(dir.output)) {
    fs.rmdirSync(dir.output, { recursive: true });
  }
  fs.mkdirSync(dir.output);
};

const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

const checkDuplicates = () => {
  for (let index = 1; index < lengthNew; index++) {
    const rawdata = fs.readFileSync(`${dir.metadata_new}/${index}.json`);
    const nft = JSON.parse(rawdata);
    const attr1 = nft.attributes;
    // console.log(attr1);
    for (let index2 = 1; index2 < length; index2++) {
      const rawdata = fs.readFileSync(`${dir.metadata}/${index2}.json`);
      const nft = JSON.parse(rawdata);
      const attr2 = nft.attributes;
      if(arraysEqual(attr1, attr2) && index !== index2){
          console.log('equal', index, index2)
      }
    }
  }
};

const main = () => {
  recreateOutputsDir();
  checkDuplicates();
};

main();
