import React, { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";

import { LIKE_POST } from "../utils/graphql";
import { AuthContext } from "../context/auth";
import { Button, Icon, Label } from "semantic-ui-react";

export default function LikeButton({ postId, likes, likesCount }) {
  const { user } = useContext(AuthContext);

  const [likePost, { loading }] = useMutation(LIKE_POST, {
    variables: { postId },
  });
  return (
    <Button as="div" labelPosition="right">
      <Button
        color="instagram"
        disabled={loading}
        onClick={user && likePost}
        basic={!(user && likes.some((like) => like.userId === user.id))}
      >
        <Icon name="heart" />
      </Button>
      <Label basic pointing="left">
        {likesCount}
      </Label>
    </Button>
  );
}
