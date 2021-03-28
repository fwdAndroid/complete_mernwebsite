const express = require('express');
require("../src/db/conn");
const User = require('./models/usermessage');
const path = require('path');
const hbs = require('hbs');


const app = express()
const port = 3000

//Add Body Parser to know express what is data format
app.use(express.urlencoded({ extended: false }));

//Adding Bootstrap JQuery
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));


//Static Website Path
app.use('/', express.static(path.join(__dirname, '../templates/views')));
app.use('/', express.static(path.join(__dirname, '../templates/partials')));


//Setting hbs
app.set('view engine', 'hbs');
app.set('views', 'templates/views');
hbs.registerPartials('templates/partials');


//Routes
app.get('/', (req, res) => res.render('index'));
app.get('/gallery', (req, res) => res.render('gallery'));
app.get('/service', (req, res) => res.render('service'));
app.get('/about', (req, res) => res.render('about'));



//Posting Data
app.post('/contact', async(req, res) => {
    try {
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render('index');
        console.log(userData);


    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => console.log(`Example app listening on port port!`))