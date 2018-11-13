let fs = require('fs')

let readline = require('readline-sync')
let path = readline.question('Input file name | file absolute path:\n')
let encoding = getEncodingAndCheck()

function getEncodingAndCheck () {
  let encodings = ['ascii', 'base64', 'binary', 'hex', 'usc2', 'usc-2', 'utf16le', 'tf-16le', 'utf8', 'utf-8', 'latin1']
  let encoding
  do {
    encoding = readline.question('Input file encoding:\n' + encodings + '\n')
  }
  while (encodings.findIndex((element) => {
    return element === encoding
  }) === -1)
  return encoding
}

new Promise((resolve, reject) => {
  setTimeout(() => {
    let text
    fs.readFile(path, encoding, function (error, content) {
      if (error) {
        reject(error)
      } else {
        text = content.split('\r\n')
        resolve(text)
      }
    })
  }, 100)
}).then(result => {
  let newResult = []
  if (result.length > 1) {
    console.log('---------\nEven lines')
    for (let i = 1; i < result.length; i += 2) {
      newResult.push(result[i])
      console.log(result[i])
    }
  } else {
    throw new Error('There are no lines matching the condition')
  }
  return newResult
}).then(result => {
  fs.writeFile('log.txt', result.toString(), encoding, () => { console.log('-----\nFile log.txt was created') })
}).catch(error => {
  console.log(error.toString())
})
