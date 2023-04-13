const router = require('express').Router();
const usersController = require('../controllers/users_controller');
router.get('/profile', usersController.profile);

module.exports = router;
