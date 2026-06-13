const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const signupRouter = require("./auth/signup");
const loginRouter = require("./auth/login");
const transactionRouter = require("./routes/transactions");

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Database successfully connected!");
})
.catch((err)=>{
    console.log(`Error : ${err}`)
})

app.use("/api/auth/",signupRouter);
app.use("/api/auth/",loginRouter);
app.use("/api/transactions",transactionRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})