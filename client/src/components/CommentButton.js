import React from "react";
import { Link } from "react-router-dom";

import { Button, Icon, Label } from "semantic-ui-react";

export default function CommentButton({ postId, commentsCount }) {
  return (
    <Button as={Link} to={`/posts/${postId}`} labelPosition="right">
      <Button color="instagram">
        <Icon name="comments" />
      </Button>
      <Label basic pointing="left">
        {commentsCount}
      </Label>
    </Button>
  );
}
