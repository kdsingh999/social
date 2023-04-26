const router = require('express').Router();
const commentsController = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;
