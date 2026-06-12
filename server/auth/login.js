const express = require("express");
const loginRouter = express.Router();
const loginSchema = require("../schemas/loginschema");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

loginRouter.post("/login",async function(req,res){
    //input validation 
    const response = loginSchema.safeParse(req.body);
    if(!response.success){
        return res.status(404).json({message:"Incorrect input format!"});
    }

    //check if the user exists 
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({
        email : email 
    })

    //if user does not exists, return error 
    if(!user){
        return res.status(404).json({message : "User account does not exist! Try signing up."});
    }

    //if user exists, check if password is correct 
    const isCorrectPassword = await bcrypt.compare(password,user.password);

    //if password is incorrect, return error 
    if(!isCorrectPassword){
        return res.status(404).json({message : "Incorrect password!"});
    }

    //if user exists and password is correct, return a token 
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    return res.status(200).json({message : "You are logged in!", token:`Bearer ${token}`});

})

module.exports = loginRouter;