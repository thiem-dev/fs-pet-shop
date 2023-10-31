import fs from 'fs';
import process from 'process';

let petData;

// console.log(process.argv.length)

if(process.argv.length <= 2){
    console.log(`Usage: node fs.js [read | create | update | destroy]`)
    process.exit(1)
} else {
    const dbCommand = process.argv[2]
    switch(dbCommand){
        case 'read':
            const index = process.argv[3]
            showPets(index);
            break;
        case 'create':
            const args = process.argv.slice(3)
            const [age, kind, name] = args
            createPet(age, kind, name)
            break;
        case 'update':
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
    const dbPath = `../pets.json`
    fs.readFile(dbPath, 'utf8', (error, data) => {
        if(error){
            console.error(`Error reading file`, error)
            process.exit(9);
        }
        petData = JSON.parse(data)
        checkRange(index)
        console.log(`file contents:`, JSON.parse(data)[index])
    })
}

function checkRange(index){
    if (0 > index || petData.length <= index){
        console.error(`Usage: node fs.js read INDEX`)//Usage: node fs.js read INDEX
        process.exit(9);
    } 
}

function createPet(arg1, arg2, arg3){
    const dbPath = `../pets.json`
    if(arg1 === undefined || arg2 === undefined || arg3 === undefined) {
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
            age: Number(arg1),
            kind: arg2,
            name: arg3
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