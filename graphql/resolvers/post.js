const Post = require("../../models/Post");
const auth = require("../../middleware/auth");
const { AuthenticationError, UserInputError } = require("apollo-server");

const PostQueries = {
  getPosts: async () => {
    try {
      const posts = await Post.find();
      return posts.reverse();
    } catch (error) {
      throw new Error(error);
    }
  },
  getPost: async (_, { postId }) => {
    try {
      const post = await Post.findById(postId);
      if (!post) throw new Error("Post not found");
      return post;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const PostMutations = {
  createPost: async (_, { body }, { req }) => {
    const user = auth(req);

    if (body.trim() === "")
      throw new UserInputError("Post body must not be empty", {
        errors: { body: "Post body must not be empty" },
      });
    const newPost = new Post({
      body,
      userId: user.id,
      username: user.username,
    });
    const post = await newPost.save();
    return post;
  },
  deletePost: async (_, { postId }, { req }) => {
    const user = auth(req);
    try {
      const post = await Post.findById(postId);
      if (!post) throw new Error("Post not found");

      if (post.userId.toString() === user.id) {
        await post.deleteOne();
        return post;
      } else {
        throw new AuthenticationError("You can only delete your own posts");
      }
    } catch (error) {
      throw new Error(err);
    }
  },
  likePost: async (_, { postId }, { req }) => {
    const { id: userId, username } = auth(req);

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const alreadyLiked = post.likes.find(
      (like) => like.userId.toString() === userId
    );

    alreadyLiked
      ? (post.likes = post.likes.filter((like) => like.userId !== userId))
      : post.likes.push({ userId, username });

    await post.save();
    return post;
  },
};

module.exports = { PostQueries, PostMutations };
