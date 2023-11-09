import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000
const dbPath = './pets.json'
let petData

// ************************************** Middleware

app.use(express.json())

//*************************************** Routes  */


app.get('/pets', async (req, res) => {
    petData = await getPets()
    console.log("app get")
    res.send(petData)
})

app.get('/pets/:id', async(req, res)=>{
    petData = await getPets()
    const index = req.params.id
    checkIndexRange(index, res)
    res.send(petData[index])
})

app.post('/pets', async(req, res)=>{
    petData = await getPets()
    let petDataNew = await writePets(req.body)
    console.log(petData, "petdatafail")
    res.send(petDataNew)
})

app.use('/', (req, res, next) => {
    next({message: "The path you are looking for does not exist", status: 404})
})

app.use((err, req, res, next) => {
    console.log("app use")
    res.status(err.status).json({ error: err })
  })

// **************************************** App Listen


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


//***************************************** Utility Functions 
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