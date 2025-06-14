const userModel = require('../models/user.model');
const {userService} = require('../services/user.service');
const {validationResult} = require('express-validator');

const createUserController = async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await userService.createUser(req.body);

        const token = await user.generateJWT();


        res.status(201).json({user,token});
    } catch (error) {
        res.status(400).send(error.message);
    }

}

const loginController = async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email}).select('+password');;

        if(!user){
          return res.status(401).json({
                errors: 'Invalid Credentials'
            })
        }

        const isMatch = await user.isValidPassword(password);


        if(!isMatch){
            return res.status(401).json({
                errors: 'Invalid Credentials'
            })
        }

       const token = await user.generateJWT();

       res.status(200).json({user,token});


    } catch (error) {
        console.error(error);
        
        res.status(400).send(error.message);
    }
}


const profileController = async function(req,res){
    console.log(req.user);

    res.status(200).json({
        user: req.user
    })
}



const userController = {createUserController , loginController , profileController};

module.exports = {userController}