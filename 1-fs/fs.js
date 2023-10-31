import fs from 'fs'
// const process = require('process');


// console.log(process.argv)

// if(process.argv.length === 0){
//     console.log(`Usage: node fs.js [read | create | update | destroy]`)
    
// } else {
//     console.log('else')
// }

fs.readFile(`../pets.json`, 'utf8', (error, data) => {
    if(error){
        console.error(`Error reading file`, error)
    }
    console.log(`file contents:`, data)
})
