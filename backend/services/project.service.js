const projectModel = require('../models/project.model');



const createProject = async ({name,userId})=>{

    if(!name){
        throw new Error('Name is required');
    }

    if(!userId){
        throw new Error('User is required');
    }



    let project;

    try {

        project = await projectModel.create({
        name,
        users:[userId]
    })
        
    } catch (error) {
        console.log(error);
        if(error.code = 11000){
            throw new Error('Project name already exist');
        }
    }


    return project

}

const projectService = {createProject}

module.exports = projectService;    