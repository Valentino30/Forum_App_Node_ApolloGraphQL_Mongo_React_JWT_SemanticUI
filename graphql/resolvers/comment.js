const Post = require("../../models/Post");
const auth = require("../../middleware/auth");
const { AuthenticationError, UserInputError } = require("apollo-server");

const CommentMutations = {
  createComment: async (_, { postId, body }, { req }) => {
    const { id: userId, username } = auth(req);

    if (body.trim() === "")
      throw new UserInputError("Comment must not be empty");

    const post = await Post.findById(postId);
    if (!post) throw new UserInputError("Post not found");

    post.comments.unshift({
      body,
      userId,
      username,
    });
    await post.save();
    return post;
  },
  deleteComment: async (_, { postId, commentId }, { req }) => {
    const { id: userId } = auth(req);

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (post.comments[commentIndex].userId === userId) {
      post.comments.splice(commentIndex, 1);
      await post.save();
      return post;
    } else {
      throw new AuthenticationError("You can only delete your own posts");
    }
  },
};

module.exports = { CommentMutations };
