const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const docactions = require('./routes/docactions');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json()); //Middleware to convert http readable stream to json
app.use(cors({ origin: '*' }));  //To accept cross origin requests from all domains

let PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)        //Using ODM(object document mapper) Mongoose to simplify the syntax of connecting to MongoDB database 
.then((res)=>{console.log("MogoDB connected")})    //It will return promise so then and catch is being used
.catch((err)=>{console.log(err)});


app.get('/',(req,res)=>{  //Just for displaying the plain text if the user visits Fronted
    res.send("This is Backend of Node.js server for Talkingdocs Website.")
})

app.use('/actions',docactions);  // docactions acting as a middleware for all the routes 



app.listen(PORT,()=>{
    console.log("Server started on Port:",PORT);
})