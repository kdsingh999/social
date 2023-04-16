const User = require('../models/user');

module.exports.profile = async (req, res) => {
  if (req.cookies.user_id) {
    const user = await User.findById(req.cookies.user_id);
    if (user) {
      return res.render('profile', {
        title: 'User Profile',
        user,
      });
    }
    return res.redirect('/users/signin');
  } else {
    return res.redirect('/users/signin');
  }
};

module.exports.signup = (req, res) => {
  return res.render('signup', {
    title: 'SignUp',
  });
};

module.exports.signin = (req, res) => {
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

module.exports.createSession = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      if (password == user.password) {
        res.cookie('user_id', user._id);
        return res.redirect('/users/profile');
      } else {
        return res
          .send({ status: 401, mess: 'username or password wrong' })
          .redirect('back');
      }
    } else {
      return res
        .send({ status: 401, mess: 'username or password wrong' })
        .redirect('back');
    }
  } catch (error) {}
};
