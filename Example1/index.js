const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet  = require("helmet");
const userRoute  = require("./routes/users");
const authRoute  = require("./routes/auth");
const morgan = require("morgan");
dotenv.config();


const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));


app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);


app.listen(8800,()=>{
    console.log("Backend is running");
});