const userModel = require('../models/user.model');


const createUser = async({email,password})=>{

    if (!email || !password) {
        throw new Error('Email and password are required');
    }


    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        email,
        password:hashedPassword
    })
    return user;
}


const getAllUsers = async ({userId})=>{
    const users = await userModel.find({
        _id : {$ne : userId}
    });

    return users;
}



const userService = {createUser,getAllUsers};

module.exports = {userService};