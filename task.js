let fs = require('fs')
new Promise((resolve, reject) => {
  setTimeout(() => {
    let text
    fs.readFile('file.txt', 'utf8', function (error, content) {
      if (error) {
        reject(error)
      } else {
        text = content.split('\r\n')
        resolve(text)
      }
    })
  }, 100)
}).then(result => {
  if (result.length > 1) {
    for (let i = 1; i < result.length; i += 2) {
      console.log(result[i])
    }
  } else {
    throw new Error('There are no lines matching the condition')
  }
}).catch(error => {
  console.log(error.toString())
})
