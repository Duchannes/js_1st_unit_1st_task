const fs = require('fs');
const readline = require('readline-sync');

const path = readline.question('Input file name | file absolute path:\n');
const encoding = readline.question('Input file encoding:\n');

const getFileContent = (path, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, function (error, content) {
      if (error) {
        reject(error);
      } else {
        const text = content.split('\r\n');
        resolve(text);
      }
    });
  });
};

getFileContent(path, encoding)
  .then(result => {
    const evenLines = result.filter((element, index) => { if (index % 2 === 1) return element; });
    if (evenLines.length) {
      console.log(evenLines.join('\n'));
    } else {
      throw new Error('There are no lines matching the condition');
    }
  }).catch(error => console.log(error.message));
