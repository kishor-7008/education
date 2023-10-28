const mongoose=require("mongoose")
const bookSchema=new mongoose.Schema({
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

const Book=mongoose.model("Book",bookSchema)
module.exports=Book