const express =require("express") ;
const router = express.Router() ;
const zod = require("zod") ;
const jwt = require("jsonwebtoken") ;
const { JWT_SECRET }  =  require("../config") ;
const { User , Account } = require("../db") ;
const { authMiddleware } = require("../middleware") ;
const bodyParser = require("body-parser") ;
router.use(bodyParser.json()) ;

router.use(express.json()) ;

const signUpBody = zod.object({
    username : zod.string().email() ,
    firstName : zod.string() ,
    lastName : zod.string() ,
    password : zod.string()  
})

const signInBody = zod.object({
    username : zod.string().email() ,
    passsword : zod.string() 
})

router.post("/signup" , async (req,res) => {
    const { success , error } = signUpBody.safeParse(req.body) ;


    // console.log(req.body.username) ;
    // console.log(req.body.firstName) ;
    // console.log(req.body.lastName) ;
    // console.log(req.body.password) ;


    if (!success) {
        console.log(error);
        return res.status(400).json({
            message: "Invalid input",
            errors: error.errors.map(err => ({
                path: err.path,
                message: err.message
            }))
        });
    }

    const existingUser = await User.findOne({
        username : req.body.username 
    })
    if(existingUser){
        return res.status(411).json({
            message : "Email is Already Taken" 
        })
    }
    const user = await User.create({
        username : req.body.username ,
        password : req.body.password ,
        firstName : req.body.firstName ,
        lastName : req.body.lastName 
    })
    const userId = user._id ;
    const balance = 1+Math.random()*10000 ;
    await Account.create({
        userId ,
        balance : balance
    }) ;

    const token = jwt.sign({
        userId
    },JWT_SECRET) ;

    res.json({
        message : "User Created Successfully" , 
        token : token ,
        balance : balance   
    })
})

router.post("/signin" , async (req,res) => {
    const { success } = signInBody.safeParse(req.body) ;
    // if(!success){
    //     return res.status(411).json({
    //         message : "Incorrect Inputs" 
    //     })
    // }
    const user = await User.findOne({
        username : req.body.username ,
        password : req.body.password 
    }) ;
    if(user){
        const token = jwt.sign({
            userId : user._id 
        },JWT_SECRET) ;
        console.log(user._id) ;
        const account =await Account.findOne({userId : user._id}) ;
        // console.log(account) ;
        // console.log(account) ;
        const balance = account.balance ;
        // console.log(balance) ;
        res.json({
            token : token ,
            balance : balance ,
            message : "signed in successfully"
        })
        return ;
    }
    res.status(411).json({
        message : "Error while logging in"    
    })
})

const updateBody = zod.object({
    password : zod.string().optional() ,
    firstName : zod.string().optional() ,
    lastName : zod.string().optional() 
}) ;

router.put("/" , authMiddleware , async (req,res) =>  {
    const { success } = updateBody.safeParse(req.body) ;
    if(!success){
        res.status(411).json({
            message : "Error in updating the value" 
        })
    }
    await User.updateOne(req.body,{
        _id : req.userId 
    })
    res.json({
        message : "updated successfully" 
    })
})

router.get("/bulk" , authMiddleware , async(req,res)=> {
    const filter = req.query.filter || "" ;
    const users = await User.find({
        $or : [{
            firstName : {
                "$regex" : filter 
            }
        },{
            lastName : {
                "$regex" : filter  
            }
        }]
    }) 
    res.json({
        user : users.map(user=>({
            username : user.username ,
            firstName : user.firstName ,
            lastName : user.lastName ,
            _id : user._id  
        }))
    })
})

router.get("/balance",authMiddleware,async(req,res)=>{

})


module.exports = router ;