import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useMutation, gql } from "@apollo/react-hooks";

import { GET_POSTS } from "../utils/graphql";

export default function PostForm() {
  const [body, setBody] = useState("");

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    variables: { body },
    // Option 1: Refetch the data (API request)
    // refetchQueries: [{ query: GET_POSTS }],
    // Option 2: Modify the local cache (no API request)
    update(proxy, result) {
      const data = proxy.readQuery({ query: GET_POSTS });
      proxy.writeQuery({
        query: GET_POSTS,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
    },
  });

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost();
    setBody("");
  };

  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className={loading ? "loading" : ""}
    >
      <h2 style={{ textAlign: "center", margin: "10px auto" }}>New Post</h2>
      <Form.Input
        fluid
        type="text"
        name="body"
        value={body}
        onChange={handleChange}
        style={{ marginTop: 24 }}
        placeholder="Type here to add a new post"
      />
      <Form.Button fluid disabled={!body.trim()} color="instagram">
        Post
      </Form.Button>
    </Form>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      userId
      username
      createdAt
      likesCount
      commentsCount
      comments {
        id
      }
      likes {
        id
      }
    }
  }
`;
