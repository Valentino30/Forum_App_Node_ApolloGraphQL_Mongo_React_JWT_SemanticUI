const UserMutations = require("./user");
const { CommentMutations } = require("./comment");
const { PostQueries, PostMutations } = require("./post");

const resolvers = {
  Post: {
    likesCount: (parent) => parent.likes.length,
    commentsCount: (parent) => parent.comments.length,
  },
  Query: {
    ...PostQueries,
  },
  Mutation: {
    ...UserMutations,
    ...PostMutations,
    ...CommentMutations,
  },
};

module.exports = resolvers;
