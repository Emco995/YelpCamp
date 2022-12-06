const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campground');
const User = require('../models/user');
const ExpressError = require('../utilities/ExpressError');
const passport = require('passport');
const localStrategy = require('passport-local');
const users = require('../controllers/users');


router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.registerUser))


router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser)


router.get('/logout', users.logOut);


module.exports = router;