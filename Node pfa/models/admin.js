const mongoose = require('mongoose');

const Admin = mongoose.model('Admin',{
    nom: {
        type: String,
    },

    adress :{
        type : String
  
    },

    pwd :{
        type : String
        

    }


})

module.exports = Admin;