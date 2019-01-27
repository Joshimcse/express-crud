/**
 * users.js
 *
 * @module      :: Routes
 * @description :: Users routes and action
 * @author      :: Joshim Uddin
 */

const router = require('express').Router();

//Load Controller
const userController = require('../controller/userController');

/**
 * @route POST api/users/register
 * @desc Register an user
 * @access Public
 */
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', userController.getUser);

module.exports = router;
