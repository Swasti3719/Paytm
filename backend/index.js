const express = require("express");
const mainRouter = require("../backend/routes/index") ;
const cors = require("cors") ;

const app = express() ;

const bodyParser = require("body-parser") ;

app.use(cors()) ;
app.use(express.json()) ;
app.use(bodyParser.json()) ;

app.use("/api/v1",mainRouter) ;

app.listen(3001 , ()=>{
    console.log("Server is Running at 3001") ;
}) ;