const router = require('express').Router();
const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);
router.post('/create', usersController.create);
router.post('/createSession', usersController.createSession);

module.exports = router;
