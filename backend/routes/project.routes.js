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


module.exports = router