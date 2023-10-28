const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderStatus: {
        orderStatus: {
            type: String,
        },
        orderCode: {
            type: String,
        },
        orderMsg: {
            type: String,
        },
    },
    txnId: {
        type: String,
        required: true
    },
    bankTxnId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    txnAmount: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    refundAmt: {
        type: Number,
        required: true
    },
    offerType:{
        type:String
    },
    offerCode:{
        type:Number
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    courseName:{
        type:String
    },
    paidAt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
},{timestamps:true});

module.exports = mongoose.model('payment', paymentSchema)