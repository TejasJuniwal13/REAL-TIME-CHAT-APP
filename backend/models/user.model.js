const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');



const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minLength:[6,'Email must be 6 characters long'],
        maxLength:[50,'Email must not be longer than 50 characters']
    },
    password: {
        type:String,
        select:false,
    }
})




userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function (password){
    console.log(password, this.password);
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWT = function(){
    return jwt.sign({email:this.email}, process.env.JWT_SECRET)
}



const Users = mongoose.model('user', userSchema);

module.exports = Users;