const mongoose = require("mongoose") ;

mongoose.connect("mongodb+srv://Swasti:4OKggkD3Fi9aIaKR@cluster0.ioc2hna.mongodb.net/PayTm") 

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true   
    },
    password : {
        type : String 
    },
    firstName : {
        type : String 
    },
    lastName : {
        type : String 
    }
}) ;

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "User" ,
        required : true 
    },
    balance : {
        type : Number ,
        required : true 
    }
}) ;

const Account = mongoose.model('Account',accountSchema) ;
const User = mongoose.model('User',userSchema) ;

module.exports = {
    User ,
    Account 
} ;