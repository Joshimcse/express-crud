/**
 * users.js
 *
 * @module      :: Routes
 * @description :: Users routes and action
 * @author      :: Joshim Uddin
 */

const router = require('express').Router();

//Load Controller
const {
  registerController,
  loginController,
  getUserController,
  getUsersController
} = require('../controller/users');

/**
 * @route  POST api/users/register
 * @desc   Register an user
 * @access Public
 */
router.post('/register', registerController);

/**
 * @route  POST api/users/login
 * @desc   Send user info to server && check it valid or not.
 * @access Public
 */
router.post('/login', loginController);

/**
 * @route  GET api/users/:id
 * @desc   That's route for retrive single user.
 * @access Public
 */
router.get('/:id', getUserController);

/**
 * @route  GET api/users/:id
 * @desc   That's route for retrive all users.
 * @access Public
 */
router.get('/', getUsersController)

module.exports = router;