const express = require('express');
const app = express();
const mysql = require('mysql2');
const dotenv = require ('dotenv');
const cors =require('cors');
const { dirname } = require('path');


app.use(express.json());
app.use(cors());
dotenv.config();

//  Connect to the database ***

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)

// Check if db connection works
db.connect((err) => {
    // No wedding today
    if(err) return console.log("error connecting to  my mysql db");

    // yes wedding connected
    console.log("connected to mysql succefully as id: ", db.threadId)

    // // Question 1. Retrieve all patients
    // // GET METHOD 
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        // retrieve data
        db.query('SELECT * FROM patients', (err, results)=>{
            if(err){
                console.error(err);
                res.status(500). send('Error retrieving data')
            }else{
                //display the records on the browser
                res.render('data', {results : results});
            }

        });
    });
//     // Question 2 Retrieve all providers
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        // retrieve data
        db.query('SELECT * FROM providers', (err, results)=>{
            if(err){
                console.error(err);
                res.status(500). send('Error retrieving data')
            }else{
                //display the records on the browser
                res.render('data', {results : results});
            }

        });
    });

    const PORT = 3000;
    app.listen(PORT, ()=> {
        console.log(`server is runnig on http://localhost:${PORT}`);

        // Send a message to the browser
        console.log('Sending message to browser...');
        app.get('/',(req,res )=>{
            res.send('server started successfullly! Wedding can go on!!!')
        })
    })

});

//Question 3 Filter patients by First Name
 
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        // retrieve data
        db.query('SELECT * FROM patients WHERE first_name = ?', (err, results)=>{
            if(err){
                console.error(err);
                res.status(500). send('Error retrieving data')
            }else{
                //display the records on the browser
                res.render('data', {results : results});
            }

        });
    });
    app.listen(PORT, ()=> {
        console.log(`server is runnig on http://localhost:${PORT}`);

        // Send a message to the browser
        console.log('Sending message to browser...');
        app.get('/',(req,res )=>{
            res.send('server started successfullly! Wedding can go on!!!')
        })
    })

});

// Question 4 Retrieve all providers by their specialty

app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');

    app.get('/data', (req,res) => {
        // retrieve data
        db.query('SELECT * FROM providers', (err, results)=>{
            if(err){
                console.error(err);
                res.status(500). send('Error retrieving data')
            }else{
                //display the records on the browser
                res.render('data', {results : results});
            }

        });
    });

    app.listen(PORT, ()=> {
        console.log(`server is runnig on http://localhost:${PORT}`);

        // Send a message to the browser
        console.log('Sending message to browser...');
        app.get('/',(req,res )=>{
            res.send('server started successfullly! Wedding can go on!!!')
        })
    })

});

