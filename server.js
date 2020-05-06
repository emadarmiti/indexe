const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const patient_router = require('./routes/patient');
const Patient = require('./models/patient.model')
const methodOverride = require('method-override')
<<<<<<< HEAD
const bodyparser=require('body-parser');
const https=require('https');
path = require('path');
  
const app= express();
=======
const https = require('https');
path = require('path');


const app = express();
>>>>>>> 6eac64312dd93545cbff671ce89680a087a138a8


app.use(methodOverride('_method'))
app.set("view engine", "ejs")
app.use(express.json());


const uri = 'mongodb+srv://emadarmiti:Th!nker1@dexter-cqfvi.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {

    console.log('database is ready');

<<<<<<< HEAD
var chemical="acenocoumarol";

app.post('/',  (req, res) => {
 
const t = req.body.chemical;
console.log(t);

    res.redirect(301, '/');
  
});


app.get('/', async (req, res) => {
 
    var url = `https://api.pharmgkb.org/v1/data/chemical?name=${chemical}`;
    console.log(url);
    
    var temp=[];
    https.get(url,(response)=>{

        console.log(response.statusCode);
        response.on('data',(data)=>{
               
                temp=JSON.parse(data)['data'][0]['altNames']['trade'];});
    });
=======
})



>>>>>>> 6eac64312dd93545cbff671ce89680a087a138a8

app.get('/', async(req, res) => {
    const patients = await Patient.find().sort({ name: 'asc' })
    res.render('patient', { patients: patients })
});


app.use('/patient', patient_router);

app.listen(4000, console.log(4000));