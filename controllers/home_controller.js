const Post = require('../models/post');

module.exports.home = async (req, res) => {
  const posts = await Post.find({})
    .populate('user')
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
      },
    })
    .exec();
  //console.log(posts);
  return res.render('home', {
    title: 'Codial | Home',
    posts,
  });
};
