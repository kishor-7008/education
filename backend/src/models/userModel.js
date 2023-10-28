const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        lowerCase:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:String,
        default:null
    },
    avtar:{
        type:String,
        default:null
    },
    dob:{
        type:Date,
        default:null
    },
    gender:{
        type:String,
        default:null
    },
    state:{
        type:String,
        default:null
    },
    country:{
        type:String,
        default:null
    },
   address:{
       type: String,
       default: null
   },
   state:{
       type: String,
       default: null
   },
   buyCourse:[{
       orderStatus: { type: String },
       orderId: {type:String},
       txnId: { type: String },
       userId: { type: String },
       courseName: { type: String },
   }]

})

module.exports = mongoose.model('user', userSchema)