import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_POST, GET_POSTS } from "../utils/graphql";
import { Button, Icon } from "semantic-ui-react";

export default function DeleteButton({ postId }) {
  const [deletePost, { loading }] = useMutation(DELETE_POST, {
    variables: { postId },
    update(proxy) {
      const data = proxy.readQuery({ query: GET_POSTS });
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        },
      });
      if (window.location.pathname !== "/") window.location = "/";
    },
  });

  return (
    <Button
      as="div"
      floated="right"
      disabled={loading}
      color="google plus"
      onClick={deletePost}
    >
      <Icon name="trash" style={{ margin: 0 }} />
    </Button>
  );
}
