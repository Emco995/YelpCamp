const User = require('../models/user');


module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register');
}


module.exports.registerUser = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to YelpCamp');
            res.redirect('/campgrounds');
        })
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
}


module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}


module.exports.loginUser = async (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}


module.exports.logOut = (req, res, next) => {
    // req.logout();
    // req.flash('success', 'Goodbye');
    // res.redirect('/campgrounds');

    req.logout(() => {
        req.flash('success', 'Goodbye');
        res.redirect('/campgrounds');
    })
}
