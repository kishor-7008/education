const mongoose = require('mongoose');

const subscribedSchema = new mongoose.Schema({
  className:{
    type:String,
    required:true,
    lowercase:true
  },
  price:{
    type:Number,
    required:true
  },
  isPurchased:{
    type:Boolean,
    default:false
  },
  userId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }]
},{timestamps:true})

module.exports = mongoose.model('Subscribed')