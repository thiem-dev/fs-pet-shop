import fs from 'fs';
import process from 'process';

// console.log(process.argv.length)

if(process.argv.length <= 2){
    console.log(`Usage: node fs.js [read | create | update | destroy]`)
} else {
    const dbCommand = process.argv[2]
    switch(dbCommand){
        case 'read':
            showPets();
            break;
        case 'create':
            console.log(`create`);
            break;
        case 'update':
            console.log(`update`);
            break;
        case 'destroy':
            console.log(`destroy`);
            break;
        default:
            console.error(`invalid command, check arguments`)
    }
}



function showPets(){
    const dbPath = `../pets.json`
    fs.readFile(dbPath, 'utf8', (error, data) => {
        if(error){
            console.error(`Error reading file`, error)
        }
        console.log(`file contents:`, data)
    })
}


