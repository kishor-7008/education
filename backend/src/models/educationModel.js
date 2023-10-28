const mongoose = require('mongoose');

const eduSchema = new mongoose.Schema({
    bookName:{
        type:String,
        uppercase:true,
        trim:true
    },
    className:{
        type:String,
        upercase:true,
        trim:true
    },
    course:{
       type:String,
       trim:true
    },
    subject:{
        type:String,
        lowercase:true,
        trim:true
    },
    chapter:{
        type:String,
        lowercase:true,
        trim:true
    },
    setNumber:{
        type:String
    },
    docsUrl:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timeStamps:true})

module.exports = mongoose.model('Education', eduSchema)