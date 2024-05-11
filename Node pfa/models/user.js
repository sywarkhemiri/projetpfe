const mongoose = require('mongoose');

const User = mongoose.model('User',{
    name: {
        type: String,
    },

    email :{
        type : String
  
    },

    password :{
        type : String
        

    },

    cin:{
        type: String
        
    },

    phone:{
        type : String

    },
    
    resultat:{
        type : String
    },
    
    date:{
        type: Date
    },
    seance:{
        type:String
    },

    argent:{
        type : Number
    },

    type:{
        type: String
    }


})

module.exports = User;