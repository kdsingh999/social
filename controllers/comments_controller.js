const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async (req, res) => {
  console.log('body', req.body);
  const post = await Post.findById(req.body.post);
  console.log('post', post);
  try {
    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
      console.log('comment', comment);
      return res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }

  console.log(post);
};
