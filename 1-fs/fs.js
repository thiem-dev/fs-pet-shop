import fs from 'fs';
import process from 'process';

let petData = [];

// console.log(process.argv.length)

const dbPath = `../pets.json`


if(3 >= 2)

if(process.argv.length <= 2){
    console.log(`Usage: node fs.js [read | create | update | destroy]`)
    process.exit(1)
} else {
    const dbCommand = process.argv[2]
    const args = process.argv.slice(2)
    switch(dbCommand){
        case 'read':
            showPets(args[1]);
            break;
        case 'create':
            createPet(args[1], args[2], args[3])
            break;
        case 'update':
            updatePet(args[1], args[2], args[3], args[4])
            console.log(`update`);
            break;
        case 'destroy':
            console.log(`destroy`);
            break;
        default:
            console.error(`invalid command, check arguments`)
            process.exit(1)
    }
}



function showPets(index){

    fs.readFile(dbPath, 'utf8', (error, data) => {
        if(error){
            console.error(`Error reading file`, error)
            process.exit(9);
        }
        petData = JSON.parse(data)
        checkRange(index)
        // console.log(`petData:`, JSON.parse(data))
        console.log(`petData at Index:`, JSON.parse(data)[index])
    })
}

function checkRange(index){
    if (0 > index || petData.length <= index){
        console.error(`Usage: node fs.js read INDEX`)//Usage: node fs.js read INDEX
        process.exit(9);
    } 
}

function createPet(ageArg, kindArg, nameArg){
    if(ageArg === undefined || kindArg === undefined || nameArg === undefined) {
        console.log(`Usage: node fs.js create AGE KIND NAME`);
        process.exit(9)
    }
    fs.readFile(dbPath, 'utf8', (error, data) => {
        if(error){
            console.error(`Error reading file`, error)
            process.exit(9);
        }
        petData = JSON.parse(data)
        petData[petData.length] = {
            age: Number(ageArg),
            kind: kindArg,
            name: nameArg
        }

        console.log(petData);
        fs.writeFile(dbPath, JSON.stringify(petData), (error) => {
            if(error){
                console.error(`Usage: node fs.js read INDEX`)//Usage: node fs.js read INDEX
                process.exit(9);
            }
            console.log('file write success');
        })
    })
}

async function updatePet(indexArg, ageArg, kindArg, nameArg){
    if(indexArg === undefined || ageArg === undefined || kindArg === undefined || nameArg === undefined) {
        console.log(`Usage: node fs.js create INDEX AGE KIND NAME`);
        process.exit(9)
    }
    let data = await fs.promises.readFile(dbPath, 'utf8', (error, data) => {
        if(error){
            console.error(`Error reading file`, error)
            process.exit(9);
        }
    })

    petData = JSON.parse(data)
    console.log(petData[indexArg])
    petData[indexArg] = {
        age: Number(ageArg),
        kind: kindArg,
        name: nameArg
    }

    fs.writeFile(dbPath, JSON.stringify(petData), (error) => {
        if(error){
            console.error(`Usage: node fs.js read INDEX`)//Usage: node fs.js read INDEX
            process.exit(9);
        }
        console.log('file write success');
    })
}