//SCHEMA FOR STUDENT

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    schoolId:{
        type:String,
        required:true,
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated:{
        type:Date,
        default:null,
    },

});

module.exports = mongoose.model('Student',studentSchema);