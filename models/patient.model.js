const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const patient_schema=new Schema({

    name:{
        type:String,
        require:true,
        unique:false
    }
    ,
    phone_number:{
         type:Number,
        require:true,
        unique:true
    },
     gender:{
        type:String,
        require:true,
        unique:false
    }
    ,
    email:{
         type:String,
        require:false,
        unique:false
    },


      social_status:{
        type:String,
        require:true,
        unique:false
    }
    ,
    birth_date:{
         type:Date,
        require:true,
        unique:false
    }
    ,
   
    location:{
         type:String,
        require:true,
        unique:false
    }
    ,
     status:{
         type:String,
        require:false,
        default:"Active" ,
        unique:false
    }
    ,
    last_appointment:{
        type:Date,
        require:false,
        unique:false
    },
    diagnosis:[String]
    
});

const patient=mongoose.model('patient',patient_schema);

module.exports=patient;