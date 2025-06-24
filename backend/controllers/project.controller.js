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

        const {name} = req.body;
        console.log(req.body);
        const loggedInUser = await userModel.findOne({email: req.user.email});
        const userId = loggedInUser._id;
    
        const newProject = await projectService.createProject({name,userId})
    
        res.status(201).json({newProject});
    } catch (error) {
        console.log(error);        
        res.status(400).send(error.message);
    }


}

const getAllProject = async(req,res)=>{
        try {
            
            const loggedInUser = await userModel.findOne({
                email:req.user.email
            })

            const userId = loggedInUser._id
            
            const allUserProjects = await projectService.getAllProjectByUserId({userId});

            res.status(200).json({
                projects : allUserProjects
            });


        } catch (err) {
            console.log(err);
            res.status(404).json({error:err.message});
        }
}


const addUserToProject = async (req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    try {

        const {projectId,users} = req.body
        
    } catch (error) {
        
    }


}

const projectController = {createProject,getAllProject,addUserToProject};

module.exports = projectController;