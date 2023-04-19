const router = require('express').Router();
const usersController = require('../controllers/users_controller');
// const passport = require('passport');
const passport = require('../config/passport-local-strategy');

router.get('/profile', passport.checkAuthentication, usersController.profile);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);
router.post('/create', usersController.create);
router.post(
  '/createSession',
  passport.authenticate('local', { failureRedirect: '/users/signin' }),
  usersController.createSession
);

router.get('/signout', usersController.destroySession);

module.exports = router;
