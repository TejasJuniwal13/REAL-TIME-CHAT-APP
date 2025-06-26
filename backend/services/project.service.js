const { default: mongoose } = require('mongoose');
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


const getAllProjectByUserId = async ({userId})=>{
    if(!userId){
        throw new Error('UserId is required');
    }


    const allUserProjects = await projectModel.find({
        users : userId
    })

    return allUserProjects

}


const addUserToProject = async({projectId,users,userId})=>{

    if(!projectId){
        throw new Error('projectId is required')
    }
    
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid projectId')
    }

    if(!users){
        throw new Error('users are required')
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('Invalid userId(s) in users array')
    }




    const project = await projectModel.findOne({
        _id:projectId,
        users:userId
    })

    if(!project){
        throw new Error('User not belong to this project')
    }

    const updateProject = await projectModel.findOneAndUpdate(
        {_id:projectId},
        {
            $addToSet: {
                users : {
                    $each: users
                }
            }
        }, {
            new:true
        }
    )

    return updateProject

}


const getProjectById = async({projectId})=>{

    if(!projectId){
        throw new Error('project id is required');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('enter a valid project id ')
    }


    const project = await projectModel.findOne({
        _id : projectId
    }).populate('users')

    return project
}

const projectService = {createProject, getAllProjectByUserId,addUserToProject,getProjectById}

module.exports = projectService;    