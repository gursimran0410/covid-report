const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const checkLogin = require('../middleware/checkLogin')

router.get('/protected',checkLogin,(req,res)=>{
    res.send("Hello User")
})

router.post('/signin',(req,res)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"Please Add All The Fields!"})
    }
    User.findOne({email})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"Invalid Email Or Password!"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(isMatch => {
            if(!isMatch){
                return res.status(422).json({error:"Invalid Email Or Password!"})
                
            }
            // res.status(200).json({message:"Successfully Signed In!"})
            const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
            return res.json({token})
        })
        .catch(err => {console.log(err)})
    })
})

router.post('/signup',(req,res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({error:"Please Add All The Fields!"})
    }
    User.findOne({email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User Already Exists"})
        }
        bcrypt.hash(password,0410)
        .then(hashedpassword => {
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"New Account Created!"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router