/**
 * userController.js
 *
 * @module      :: Controller
 * @description :: defination of users routes action...
 * @author      :: Joshim Uddin
 */

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = {

  /**
   * @controller Register
   * @desc register a users to the database...
   */
  register: (req, res) => {
    let { name, email, password } = req.body;
    // Varidation
    

    // check email exist or not. If not exist then store to the database.
    User.findOne({ email }).then(user => {
      if (user) {
        return res.status(409).json({ email: 'Email already exist' });
      } else {
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });
        const newUser = new User({
          name, email, avatar, password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save()
              .then(user => res.status(201).json(user))
              .catch(err => console.log(err))
          })
        });
      }
    }).catch(err => console.log(err));
  },

  /**
   * @controller Login
   * @desc Register an user
   */
  login: () => {
    res.status(200).json({ msg: 'login' });
  },


  getUser: (req, res) => {
    User.find({}).then(users => res.json(users))
  }
}