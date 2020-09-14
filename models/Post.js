const { Schema, model, Mongoose } = require("mongoose");

const PostSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  comments: [
    {
      body: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  likes: [
    {
      userId: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = model("Post", PostSchema);

module.exports = Post;
