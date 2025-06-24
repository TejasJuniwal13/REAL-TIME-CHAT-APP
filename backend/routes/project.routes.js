const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const projectController = require('../controllers/project.controller');
const {authUserMiddleware} = require('../middlewares/auth.middleware');


router.post('/create',
    authUserMiddleware.authUser,
    body('name').isString().withMessage('Name is required'),
    projectController.createProject
    
)

router.get('/all',
    authUserMiddleware.authUser,
    projectController.getAllProject
)

router.put('/add-user', 
    authUserMiddleware.authUser,
    body('projectId').isString().withMessage('Project Id is required'),
    body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
        .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    projectController.addUserToProject
)



module.exports = router