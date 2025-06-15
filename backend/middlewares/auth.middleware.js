const jwt = require('jsonwebtoken');
const redisClient = require('../services/redis.service');

const authUser = async function (req, res, next) {

   
    let token;
    
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(' ')[1];
    }
    
    
    if(!token){
        return res.status(401).json({error:'Please Authenticate'});
    }

    const isBlacklisted = await redisClient.get(token);

    if(isBlacklisted){
        return res.status(401).send({error: 'Unauthorized User'});
    }
    
    try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
    } catch (error) {
        console.error(error)
        res.status(401).send({error:"Please Authenticate"});
    }
}

const authUserMiddleware = {authUser};

module.exports = {authUserMiddleware};