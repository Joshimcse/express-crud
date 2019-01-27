/**
 * users.js
 *
 * @module      :: Routes
 * @description :: Users routes and action
 * @author      :: Joshim Uddin
 */

const router = require('express').Router();

//Load Controller
const { registerController, loginController, getUserController, getUsersController } = require('../controller/users');

/**
 * @route POST api/users/register
 * @desc Register an user
 * @access Public
 */
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/:id', getUserController);
router.get('/', getUsersController)

module.exports = router;