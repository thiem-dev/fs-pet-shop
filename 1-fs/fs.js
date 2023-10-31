import fs from 'fs';
import process from 'process';


// console.log(process.argv.length)

if(process.argv.length <= 2){
    console.log(`Usage: node fs.js [read | create | update | destroy]`)
} else {
    const dbCommand = process.argv[2]
    switch(dbCommand){
        case 'read':
            const index = process.argv[3]
            showPets(index);
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



function showPets(index){
    const dbPath = `../pets.json`
    fs.readFile(dbPath, 'utf8', (error, data) => {
        if(error){
            console.error(`Error reading file`, error)
            process.exit(9);
        }
        console.log(`file contents:`, JSON.parse(data)[index])
    })
}


