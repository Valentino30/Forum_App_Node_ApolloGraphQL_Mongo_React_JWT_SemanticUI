const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    getPosts: [Post!]!
    getPost(postId: ID!): Post!
  }
  type Mutation {
    register(input: RegisterInput!): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
  }
  type Post {
    id: ID!
    body: String!
    userId: String!
    username: String!
    createdAt: String!
    comments: [Comment!]!
    likes: [Like!]!
    commentsCount: Int!
    likesCount: Int!
  }
  type Comment {
    id: ID!
    body: String!
    userId: ID!
    username: String!
    createdAt: String!
  }
  type Like {
    id: ID!
    userId: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }
`;

module.exports = typeDefs;
