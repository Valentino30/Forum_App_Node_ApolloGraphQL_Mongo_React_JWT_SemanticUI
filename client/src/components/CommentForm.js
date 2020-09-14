import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/react-hooks";

// : Dry up code. Very similar to PostForm
export default function CommentForm({ postId }) {
  const [body, setBody] = useState("");
  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    variables: { postId, body },
  });

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createComment();
    setBody("");
  };
  return (
    <Form
      noValidate
      onSubmit={handleSubmit}
      className={loading ? "loading" : ""}
    >
      <Form.Input
        fluid
        type="text"
        name="body"
        value={body}
        onChange={handleChange}
        style={{ marginTop: 24 }}
        placeholder="Type here to add a new comment"
      />
      <Form.Button fluid disabled={!body.trim()} color="instagram">
        Comment
      </Form.Button>
    </Form>
  );
}

const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      commentsCount
      comments {
        id
        body
        userId
        username
        createdAt
      }
    }
  }
`;
