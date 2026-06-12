const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const authMiddleware = function(req,res,next){

    const header = req.headers.authorization ; 

    if(!header){
        return res.status(404).json({message : "No token found!"});
    }

    const token = header.split(" ")[1];

    //verify the token 
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded ; 
        next();
    }
    catch(err){
        return res.status(403).json({message : "Unauthorized!"});
    }

}

module.exports = authMiddleware;