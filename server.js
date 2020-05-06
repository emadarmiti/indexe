const express = require('express');
const mongoose=require('mongoose');
const patient_router=require('./routes/patient');
const Patient = require('./models/patient.model')
const methodOverride = require('method-override')

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


app.get('/', async (req, res) => {
  const patients = await Patient.find().sort({ name: 'desc' })
  res.render('patient', { patients: patients })
})

app.use('/patient',patient_router);

app.listen(4000,console.log(4000));
