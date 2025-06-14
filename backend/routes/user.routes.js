const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const {authUserMiddleware} = require('../middlewares/auth.middleware');


const { userController } = require('../controllers/user.controller');


//register Route
router.post('/register',
    body('email').isEmail().withMessage('Email address should be valid'),
    body('password').isLength({ min: 4 }).withMessage('password must be 4 characters long'),
    userController.createUserController);


//login Route
router.post('/login', 
    body('email').isEmail().withMessage('Email address should be valid'),
    body('password').isLength({min:4}).withMessage('Password must be 4 characters long'),

    userController.loginController
)


//Profile Route
router.get('/profile', authUserMiddleware.authUser , userController.profileController);



module.exports = router