const Like = require("../models/like");
const Post = require("../models/post");

// Like post
async function likePost(req, res) {
  try {
    const user = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById({ _id: postId });

    if (!post) res.status(400).send({ message: "Could not find the post" });

    const existingLike = await Like.findOne({ post_id: postId, user_id: user });
    if (existingLike) {
      return res.status(400).send({ message: "Post already liked" });
    }

    const newLike = new Like({
      user_id: user,
      post_id: postId,
    });
    await newLike.save();

    const newPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: newLike._id } },
      { new: true }
    ).populate("likes");
    return res
      .status(200)
      .json({ message: "Successfully like a post", data: newPost.likes });

    return res.status(400);
  } catch (error) {
    res.status(500).send({ message: "Interval error", error: error });
  }
}

async function unLikePost(req, res) {
  try {
    const user = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById({ _id: postId });

    if (!post) res.status(400).send({ message: "Could not find the post" });

    const like = await Like.findOne({ post_id: postId, user_id: user });

    await Like.findOneAndDelete({ post_id: postId, user_id: user });
    const newPost = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { likes: { user_id: user } },
      },
      { new: true }
    ).populate("likes");
    return res
      .status(200)
      .json({ message: "Successfully unlike a post", data: newPost.likes });
  } catch (error) {
    res.status(500).send({ message: "Interval error", error: error });
  }
}

module.exports = likeController = {
  likePost,
  unLikePost,
};
