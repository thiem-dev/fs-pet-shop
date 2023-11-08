import express from 'express'
import fs from 'fs' //remove later when connected to fs
import pg from 'pg'

const { Pool } = pg;
const PORT = 3000;
const app = express();

// const pool = new Pool({
//     user: process.env.DB_USER, //postgres
//     host: process.env.DB_HOST, //localhost
//     database: "",
//     password: process.env.DB_PASSWORD, //postgres pw
//     // port: process.env.PORT || 3000 || PORT,
// })


let petData;
const dbPath = `../pets.json`

// ------------------------------------------------------ MIDDLEWARE
app.use(express.json())


// app.use('/', (req, res, next) => {
//     console.log('validation check goes here')
//     next()
// })
// ------------------------------------------------------- ROUTES

//GET ALL

app.get('/pets', async (req, res) => {
    petData = await getPets()
    console.log('get all pets path')
    res.send(petData)
})


//GET ONE
app.get('/pets/:id', async(req, res) => {
    petData = await getPets()
    const index = req.params.id
    checkIndexRange(index, res)
    res.send(petData[index])
})

//POST
app.post('/pets', async(req, res) => {
    petData = await getPets()
    let petDataNew = await writePets(req.body)
    res.send(petDataNew)
})

//PUT /PATCH
app.put('/pets/:id', async (req, res) => {
    petData = await getPets();
    const index = req.params.id
    let adjustedPetData = await adjustPets(index, req.body)
    res.send(adjustedPetData);
})


//DELETE


app.use((req, res, next) => {
    next({message: "The path you are looking for does not exist", status:404})
})


app.use((err, req, res, next) => {
    console.log('unknown route hit')
    res.status(err.status).json({ error:err })
})


app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})

// --------------------------------------------------- UTILITY FUNCTIONS


function checkIndexRange(index, res){
    if(index > petData.length){
        res.send(404, 'Not Found')
    } else if(index < 0){
        res.send(404, 'Not Found')
    }
    console.log("Inside check range", petData[index])
}

async function getPets(){
    try{
        let data = await fs.promises.readFile(dbPath, 'utf8')
        petData = JSON.parse(data)
        return petData
    } catch(error) {
        res.send(error)
    }
    
}

async function writePets(obj){
    if(Object.keys(obj).length > 0){
        petData.push(obj)
        fs.writeFile(dbPath, JSON.stringify(petData), (error) => {
            if(error){
                return {message: "Error writing to the file"}
            } 
        })
        return petData
    } else {
        console.log("Request body cannot be empty")
    }
}

async function adjustPets(index, obj){
    if(Object.keys(obj).length > 0){
        const newPetData = [
            ...petData.slice(0, index),
            obj,
            ...petData.slice(index+1)
        ]
        fs.writeFile(dbPath, JSON.stringify(newPetData), (error) => {
            if(error){
                return {message: "Error writing to the file"}
            } 
        })
        return newPetData;
    } else {
        console.log("Request body cannot be empty")
    }
}