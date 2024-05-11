const express = require('express');
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





//////////////////////SIGNUP
router.post('/register',async (req,res)=>{
    data=req.body;
    usr=new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync(data.password , salt);
    usr.password=cryptedPass;
    usr.save()
    .then(
        (saved)=>{
            res.status(200).send(saved)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err);
        }

    )


})

/////////////////////////LOGIN
router.post('/login', async(req,res)=>{
    data=req.body;
    user= await User.findOne({ email: data.email})
    if(!user){
        res.status(404).send('email or password invalid !')

    }
    else{
        validPass=bcrypt.compareSync(data.password , user.password)

    }
    if (!validPass){
        res.status(401).send('email or password invalid !')

    }
    else{
        payload={
            _id: user._id,
            email:user.email,
            name:user.name
        }
        token=jwt.sign(payload,'123456789')
        res.status(200).send({mytoken:token})

    }
})


/////////////////CREATE
router.post('/create', async(req,res)=>{
    try {
    data = req.body;
    usr= new User(data);
    
    savedUser = await usr.save();
    res.send(savedUser)
    
    }catch (err){
        res.send(err)
    }
    })
    ///////////////////

    ///////////GET ALL

    router.get('/alluser' , async (req,res)=>{
        try{
        user=await User.find()
                res.status(200).send(user);
            
        }
    
        catch
            (err){
                res.send(err)
            }
         } )

    /////////////
    
    ////////////////GET BY ID******
    
    router.get('/byid/:id' , async (req,res)=>{
        try{
        id= req.params.id;
        user=await User.findOne({_id: id})
                res.send(user);
            
        }
    
        catch
            (err){
                res.send(err)
            }
         } )
    
    ///////////////////
    
    /////////////DELETE
    
    router.delete('/del/:id',async(req,res)=>{
    
        try{
            id= req.params.id;
            deletedUser =await User.findByIdAndDelete({_id: id})
                    res.send(deletedUser);
                
            }
        
            catch
                (err){
                    res.send(err)
                }
             } )
    
    //////////////////
    
    ////////////////UPDATE
    
    router.put('/update/:id',async(req,res)=>{
    
        try{
            id= req.params.id;
            newdata = req.body
            update =await User.findByIdAndUpdate({_id: id}, newdata)
                    res.send(update);
                
            }
        
            catch
                (err){
                    res.send(err)
                }
             } )
    
    //////////////////////



module.exports = router;
