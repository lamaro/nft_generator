"use strict";

const fs = require("fs");

const path = "./outputs/metadata";
const statsExport = "./outputs/stats";
const length = fs.readdirSync(path).length;

let traits = [];
let traitsPercent = [];
const avatarsPercent = [];
const monstersTotalsArr = [];

const generatePercents = async () => {
  for (let index = 1; index <= length; index++) {
    let rawdata = fs.readFileSync(`${path}/${index}.json`);
    let nft = JSON.parse(rawdata);

    nft.attributes.forEach((attr) => {
      const indexAttr = traits.findIndex((trait) => trait.trait_type === attr.trait_type && trait.value === attr.value);
      if (indexAttr !== -1) {
        traits[indexAttr] = {
          trait_type: attr.trait_type,
          value: attr.value,
          count: traits[indexAttr].count + 1,
        };
      } else {
        traits.push({
          trait_type: attr.trait_type,
          value: attr.value,
          count: 1,
        });
      }
    });
  }
  traitsPercent = traits.map((trait) => {
    return { ...trait, percnt: (trait.count / length) * 100 };
  });
  //console.log("traitsPercent", traitsPercent);
  fs.writeFileSync(
    `${statsExport}/traits_perecent.json`,
    JSON.stringify(traitsPercent),
    function (err) {
      if (err) throw err;
    }
  );
};

const monstersPercent = async () => {
  for (let index = 1; index <= length; index++) {
    let rawdata = fs.readFileSync(`${path}/${index}.json`);
    let nft = JSON.parse(rawdata);
    const attrArr = [];
    nft.attributes.forEach((attr) => {
      //console.log('trait',traitsPercent)
      const percent = traitsPercent.find(({ trait_type, value, percnt }) => {
        return value === attr.value && trait_type === attr.trait_type;
      });
      //console.log('per', percent.percnt)
      attrArr.push({
        trait_type: attr.trait_type,
        value: attr.value,
        percent: percent.percnt,
        count: percent.count,
      });
    });
    avatarsPercent.push({ name: nft.name, id: index, traits: attrArr });
    //console.log({ name: nft.name, id: index, traits: attrArr });
  }
  fs.writeFileSync(
    `${statsExport}/gimmicks_stats.json`,
    JSON.stringify(avatarsPercent),
    function (err) {
      if (err) throw err;
    }
  );
};

const monstersTotals = async () => {
  avatarsPercent.forEach((avatar) => {
    const totalRarity = avatar.traits.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.percent;
    }, 0);
    //console.log('rarity', `${avatar.name},`, totalRarity.toFixed(2))
    monstersTotalsArr.push({ name: avatar.name, rarity: totalRarity });
  });
  // const sortedMonsters = monstersTotalsArr.sort((a, b) => a.rarity.localeCompare(b.rarity));
  // console.log(sortedMonsters[0], sortedMonsters[1])
  fs.writeFileSync(
    `${statsExport}/gimmicks_totals.json`,
    JSON.stringify(monstersTotalsArr),
    function (err) {
      if (err) throw err;
    }
  );
};

const main = async () => {
  await generatePercents();
  await monstersPercent();
  await monstersTotals();
};

main();
