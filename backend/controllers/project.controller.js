const projectModel = require('../models/project.model');
const projectService = require('../services/project.service');
const {validationResult} = require('express-validator');
const userModel = require('../models/user.model');



const createProject = async(req,res)=>{
    
    const erros = validationResult(req);

    if(!erros.isEmpty()){
        return res.status(400).json({error:erros.array()});
    }


    try {

        const {name,email} = req.body;
        console.log(req.body);
        const loggedInUser = await userModel.findOne({email});
        const userId = loggedInUser._id;
    
        const newProject = await projectService.createProject({name,userId})
    
        res.status(201).json(newProject);
    } catch (error) {
        console.log(error);        
        res.status(400).send(error.message);
    }


}

const projectController = {createProject};

module.exports = projectController;