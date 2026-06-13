const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Transaction = require("../models/Transaction");

router.use(express.json());

//post a transaction (income/expense)
router.post("/addtransaction",authMiddleware,async function(req,res){
    const userId = req.user.id;
    const amount = req.body.amount;
    const description = req.body.description;
    const type = req.body.type;

    try{
    await Transaction.create({
        userId : userId,
        amount : amount,
        description : description,
        type: type,
    })
    return res.status(200).json({message:"Successfully added the transaction!"});
    }
    catch(err){
        return res.status(403).json({message : "Something went wrong!"});
    }

})

//delete a transaction 
router.delete("/deletetransaction/:id",authMiddleware,async function(req,res){
    const transactionId = req.params.id;
    const userId = req.user.id;
    const transaction = await Transaction.findById(transactionId);
    if(!transaction || transaction.userId.toString()!==userId){
        return res.status(403).json({message : "Unauthorized!"});
    }

    try{
        await Transaction.findByIdAndDelete(transactionId);
        return res.status(200).json({message : "Transaction deleted!"});
    }
    catch(err){
        return res.status(404).json({message : err});
    }
    
})


//get all transactions 
router.get("/transactions",authMiddleware,async function(req,res){
    const userId = req.user.id;
    try{
        const transactions = await Transaction.find({
        userId : userId
        })
        return res.status(200).json({transactions});
    }
    catch(err){
        return res.status(403).json({message : "Something went wrong!"});
    }
    
})


module.exports = router; 




