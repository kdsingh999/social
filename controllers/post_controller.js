const Post = require('../models/post');

module.exports.create = async (req, res) => {
  try {
    //console.log(req.user._id);
    const post = await Post.create({
      content: req.body.content,
      user: req.user.id,
    });
    if (!post) {
      return;
    } else {
      return res.redirect('back');
    }
  } catch (error) {
    console.log(error);
  }
};
