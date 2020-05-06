const express = require('express');
const mongoose=require('mongoose');
const patient_router=require('./routes/patient');
const Patient = require('./models/patient.model')
const methodOverride = require('method-override')
const bodyparser=require('body-parser');
const https=require('https');
path = require('path');
  
const app= express();


app.use(methodOverride('_method'))
app.set("view engine", "ejs")
app.use(express.json());


const uri='mongodb+srv://emadarmiti:Th!nker1@dexter-cqfvi.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true });
const connection=mongoose.connection;

connection.once('open',()=>{

    console.log('database is ready');
    
})

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

  const patients = await Patient.find().sort({ name: 'asc' })
  res.render('patient', { patients: patients,temp:temp })
});


app.use('/patient',patient_router);

app.listen(4000,console.log(4000));
