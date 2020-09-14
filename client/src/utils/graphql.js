import { gql } from "@apollo/react-hooks";

export const GET_POSTS = gql`
  {
    getPosts {
      id
      body
      userId
      username
      createdAt
      likesCount
      commentsCount
      comments {
        id
        body
        userId
        username
        createdAt
      }
      likes {
        id
        userId
        username
        createdAt
      }
    }
  }
`;

export const GET_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      userId
      username
      createdAt
      comments {
        id
        body
        userId
        username
        createdAt
      }
      likes {
        id
        userId
        username
        createdAt
      }
      commentsCount
      likesCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      id
      body
      userId
      username
      createdAt
      likesCount
      commentsCount
      comments {
        id
        body
        userId
        username
        createdAt
      }
      likes {
        id
        userId
        username
        createdAt
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      userId
      username
      createdAt
      likesCount
      commentsCount
      comments {
        id
        body
        userId
        username
        createdAt
      }
      likes {
        id
        userId
        username
        createdAt
      }
    }
  }
`;
