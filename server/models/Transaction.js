const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    amount : {type : Number,required:true},
    description : {type:String,required:false},
    type: {type:String, enum:["income","expense"] ,required:true},
    date : {type: Date, default:Date.now}
})

const Transaction = mongoose.model("Transaction",transactionSchema);

module.exports = Transaction;