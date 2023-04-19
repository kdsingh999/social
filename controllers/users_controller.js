const User = require('../models/user');

module.exports.profile = (req, res) => {
  return res.render('profile', {
    title: 'profile',
  });
};

module.exports.signup = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('signup', {
    title: 'SignUp',
  });
};

module.exports.signin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('signin', {
    title: 'SignIn',
  });
};

module.exports.create = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = await User.create(body);
      if (newUser) {
        return res.redirect('/users/signin');
      } else {
        return res.redirect('back');
      }
    } else {
      return res.redirect('back');
    }
  } catch (error) {
    return res.redirect('back');
  }
};

module.exports.createSession = (req, res) => {
  try {
    return res.redirect('/');
  } catch (error) {}
};

module.exports.destroySession = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
  });
  return res.redirect('/');
};
