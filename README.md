# WTD NTF Generator

Autor: Leandro Amaro García (leandro@waytoodigital.com)

This script generates the desired amount of NFT images and metadata by selecting random layers of each type of trait.
This script supports different characters with different lists of traits.


## Available Commands

```yarn start``` 
Runs the main script generating images and metadata into the ```/output``` folder

```yarn ipfs```
Modifies the metadata to be prepared for IPFS (Pinata) upload. Before run make sure to change the IPFS_URL param with the folder hash of the previus uploaded images. It creates a ```/output/metadata/ipfs``` folder

## Usage
- Place all your different characters assets inside ``` layers/trait_types/[character]```
- Inside ```data/characters/[character]/traits.js``` add the corresponding information for: head/body, folder in trait_types and traits.
Head/body and traits must be written in object notation and must contain a weight, name and file keys. The weight key should be an integer number [0..100]. Higher numbers makes that trait more often to appear (used for rarities).
- Run the ```yarn start``` command.
- Check the ```/output/``` folder for images and metadata.
- Check the ```/output/stats/``` for information about the generated collection (totals, rarities, etc)

