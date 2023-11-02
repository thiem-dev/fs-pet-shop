import express from 'express'
import fs from 'fs'

const app = express()
const port = 3000
const dbPath = './pets.json'
let petData

app.use(express.json())

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

// app.use((err, req, res, next) => {
//     console.log("app use")
//     res.status(err.status).json({ error: err })
//   })

function checkIndexRange(index, res){
    if(index > petData.length){
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end("Not Found")
    } else if(index < 0){
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end("Not Found")
    }
    console.log("Inside check range", petData[index])

}

async function getPets(){
    try{
        let data = await fs.promises.readFile(dbPath, 'utf8')
        petData = JSON.parse(data)
        console.log(data)
        return petData
    } catch(error) {
        res.send(error)
    }
    
}


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

// app.get('/:num', (req, res, next) => {
//     const num = req.params.num
//     if (!Number(num)) {
//       next({ status: 400, message: 'Please enter a number!' })
//     } else {
//       res.json({ message: `${num} is a great number.` })
//     }
//   })
  
//   app.use((err, req, res, next) => {
//     res.status(err.status).json({ error: err })
//   })