const express = require("express");
const signupRouter = express.Router();
const signupSchema = require("../schemas/signupschema");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

signupRouter.post("/signup",async function(req,res){

    //input validation
    const result = signupSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json({message : "Incorrect input format!"});
    }

    //check if user exists in the database
    const email = req.body.email
    const password = req.body.password
    const username = req.body.username 

    const user = await User.findOne({
        email
    })

    //if user already exists, return error
    if(user){
        return res.status(401).json({message : "user account already exists! Try logging in."})
    } 

    //else,hash password 
    const hashedPassword = await bcrypt.hash(password,10);

    //store user details in database 
    await User.create({
        email : email,
        password : hashedPassword,
        username : username
    })

    //return success message 
    return res.status(200).json({message : "Signed up successfully!"});

})

module.exports = signupRouter;