const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Search all User
router.get('/searchAll/', async (req, res) => {
    try{

        const userTmp = await User.find();

        if(userTmp.length > 0){
            res.json(userTmp);
        }else{
            res.json({"status" : "new"});
        }
    }catch (err){
        res.json({message: err});
    }
});

// Search User by email
router.get('/searchByEmail/:email', async (req, res) => {

    let email = req.params.email;

    try{

        const userTmp = await User.find({email: email});

        if(userTmp.length > 0){
            res.json(userTmp);
        }else{
            res.json({"status" : "new"});
        }
    }catch (err){
        res.json({message: err});
    }
});

// Search User by Email and Passwrod // Return with True or False
router.get('/searchByEmail/:email/:password', async (req, res) => {

    let email = req.params.email;
    let password = req.params.password;

    try{

        const userTmp = await User.find({email: email, password: password});

        if(userTmp.length > 0){
            res.json({"status" : "true"});
        }else{
            res.json({"status" : "false"});
        }
    }catch (err){
        res.json({message: err});
    }
});

// Simple get
router.get('/test', async (req, res) => {
    res.json({"status" : "new"});
});

// Insert new user
router.post('/insertNewUser', async (req, res) => {

    const userTmp = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        gender: req.body.gender,
        idCard: req.body.idCard
    });

    try{
        const userChk = await User.find({email: userTmp.email});

        if(userChk.length > 0){
            res.json({"status" : "duplicate"})
        }else{
            const saveUser = await userTmp.save();
            res.json(saveUser);
        }
        
       
    }catch(err){
        res.json({message: err});
    }
    
});

// Updated user
router.put('/updateProfile', async (req, res) => {

    const userTmp = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo,
        gender: req.body.gender,
        idCard: req.body.idCard
    });

    try{
        const userChk = await User.find({email: userTmp.email});

        if(userChk.length > 0){
            // const saveUser = await User.updateOne({email: userTmp.email}, userTmp);

            var condition =  { email: userTmp.email };
            var updateValues = { $set : { 
                userName: userTmp.userName,
                email: userTmp.email,
                password: userTmp.password,
                phoneNo: userTmp.phoneNo,
                gender: userTmp.gender,
                idCard: userTmp.idCard  } };

            const updateUser = await User.updateOne (condition, updateValues,
                function( err, result ) {
                    if ( err ) {
                        res.json({"status": err});
                        throw err;
                    }else {
                        res.json({"status": "complete"});
                    }
                }
            );
            
        }else{
            const saveUser = await userTmp.save();
            res.json(saveUser);
        }
        
       
    }catch(err){
        res.json({message: err});
    }
    
});

module.exports = router;