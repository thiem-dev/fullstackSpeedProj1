const express = require("express");
const pg = require("pg");
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { Pool } = pg;
const apiPort = process.env.API_PORT || 3000;
const app = express();

const pool = new Pool({
    connectionString: process.env.DB_URL,
});

// ------------------------------------------------------- MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

// ------------------------------------------------------- BASIC ROUTES

//get all person
app.get('/api/person', async (req, res) => {
    try{
        const result = await pool.query(
            `SELECT * FROM person`
        )
        if(result.rows.length === 0){
            return res.status(400).send(`no rows in person`)
        }
        res.send(result.rows);
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

//get one person
app.get('/api/person/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await pool.query(
            `SELECT * FROM person
            WHERE id=$1;`, [id]
        )
        if(result.rows.length === 0){
            return res.status(400).send(`no rows in person`)
        }
        res.send(result.rows);
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

//create new person
app.post('/api/person/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await pool.query(
            `INSERT INTO person (fname, lname) VALUES
            ($1,$2)
            RETURNING *;`, [fname, lname]
        )
        if(result.rows.length === 0){
            return res.status(400).send(`no rows in person`)
        }
        res.send(result.rows);
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

//update person
app.put('/api/person/:id', async (req, res) => {
    const { id } = req.params;
    const { fname, lname } = req.body;
    try{
        const result = await pool.query(
            `UPDATE person 
            SET fname=$1, lname=$2
            WHERE id=$3
            RETURNING *;`, [fname, lname, id]
        )
        if(result.rows.length === 0){
            return res.status(400).send(`no rows in person`)
        }
        res.send(result.rows);
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});


//delete person
app.delete('/api/person/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await pool.query(
            `DELETE FROM page WHERE id=$1
            RETURNING *;`, [pageId]
        )
        if(result.rows.length === 0){
            return res.status(400).send(`no rows in person`)
        }
        res.send(result.rows);
    } catch (error){
        console.log(error)
        res.status(400).json(error)
    }
});

//  ------------------------------------------------------------ CATCH ALL ROUTE
app.use('/', (req, res, next) => {
    next({message: "The path you are looking for does not exist", status: 400})
})

app.listen(apiPort, (req, res) => {
    res.status(err.status).json({error:err})
})

//  ------------------------------------------------------------ SERVER LISTENER

app.listen(apiPort, () => {
    console.log(`server listening on http://localhost:${apiPort}`)
})