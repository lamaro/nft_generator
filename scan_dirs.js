const path = require('path');
const fs = require('fs');
//joining path of directory 

const FOLDER = 'Ears'

const directoryPath = path.join(__dirname, `layers/trait_types/${FOLDER}`);

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

function capitalize([first, ...rest]) {
    return first.toUpperCase() + rest.join('').toLowerCase();
  }

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        const fileNoExt = file.substring(0, file.length-4);
        const fileSpaces = fileNoExt.replaceAll('-',' ')
        const fileCapital = capitalize(fileSpaces)
        console.log(`{ name: "${fileCapital}", file: "${FOLDER}/${file}", weight: 20 },`); 
    });
});