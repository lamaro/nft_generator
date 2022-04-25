const fs = require("fs");
const { characters } = require("./data/characters/characters");

const main = () => {
  const notFoundFiles = [];
  for (let index = 0; index < characters.length; index++) {
    const character = characters[index].folder;
    console.log('Character-------->',character)
    const {
      traits,
      folderPath,
    } = require(`./data/characters/${character}/traits.js`);

    for (let indexTrait = 0; indexTrait < traits.length; indexTrait++) {
      const trait = traits[indexTrait];
      for (
        let indexTraitSub = 0;
        indexTraitSub < trait.length;
        indexTraitSub++
      ) {
        const element = trait[indexTraitSub];
        try {
          if (
            fs.existsSync(`./layers/trait_types/${folderPath}/${element.file}`)
          ) {
            console.log("File exists",`${folderPath}/${element.file}`);
          }else{
            console.error("File not found", `${folderPath}/${element.file}`);
            notFoundFiles.push(`${folderPath}/${element.file}`)
          }
        } catch (err) {
          console.error("File not found", err);
          notFoundFiles.push(`${folderPath}/${element.file}`)
        }
      }
    }
  }
  console.log(notFoundFiles)
};

main();
