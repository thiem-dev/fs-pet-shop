import express from 'express';
import path from 'path'
import fs from 'fs'; //remove later when connected to fs
import pg from 'pg';

const { Pool } = pg;
const apiPORT = 3000;
const app = express();

const pool = new Pool({
    user: process.env.DB_USER, //postgres
    host: process.env.DB_HOST, //localhost
    database: "petshop", //varies per project
    password: process.env.DB_PASSWORD, //postgres pw
    port: process.env.DB_PORT || 5432 //postgres port
})

// ------------------------------------------------------ MIDDLEWARE
app.use(express.json());
app.use(express.static('public')) //serves index.html

// app.use((req, res, next) => {
//     console.log('validation check goes here')
//     next()
// })
// ------------------------------------------------------- ROUTES


app.get('/api/pets', async (req, res) => {
    try{
        const result = await pool.query(
            'SELECT * FROM pets'
        );
        res.send(result.rows)
    } catch(error){
        console.log(error)
        res.json(error)
    }
})

app.get('/api/pets/:id', async (req, res) => {
    const index = req.params.id;
    try{
        const result = await pool.query(
            `SELECT * FROM pets
            WHERE id=$1;`, [index]
        );
        
        if(result.rows.length === 0){
            res.send('No pet id exists here')
            throw new Error()
        }
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.json(error)
    }
})

app.post('/api/pets', async(req, res) =>{
    const {age, name, kind} = req.body;
    try{
        const result = await pool.query(
            `INSERT INTO pets (age, name, kind) 
            VALUES ($1, $2, $3)
            RETURNING *; `, [age, name, kind]
        );
        res.send(result.rows)
    } catch(error) {
        console.log(error)
        res.json(error)
    }
})

app.put('/api/pets/:id', async (req, res) => {
    const index = req.params.id;
    const {age, name, kind} = req.body;
    try{
        const result = await pool.query(
            `UPDATE pets
            SET age=$1, name=$2, kind=$3
            WHERE id = $4
            RETURNING *;
            `, [age, name, kind, index]
        )
            if(result.rows.length === 0){
                return res.status(404, `Pet id: ${index} does not exist`);
            }

        res.send(result.rows)
    } catch (error){
        console.log(error)
        res.json(error)
    }
})

app.delete('/api/pets/:id', async (req, res) => {
    const index = req.params.id;
    try{
        const result = await pool.query(
            `DELETE FROM pets WHERE id=$1
            RETURNING *;`, [index]
        )
        res.send(result.rows)
    } catch(error) {
        console.log(error)
        res.json(error)
    }
});

app.listen(apiPORT, () => {
    console.log(`server listening on http://localhost:${apiPORT}`)
})