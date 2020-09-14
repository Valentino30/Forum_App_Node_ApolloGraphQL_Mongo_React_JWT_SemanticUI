import moment from "moment";
import React, { useContext } from "react";
import { useMutation, gql } from "@apollo/react-hooks";
import { Card, Icon, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export default function Comment({
  postId,
  comment: { id: commentId, body, userId, username, createdAt },
}) {
  const { user } = useContext(AuthContext);

  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    variables: { postId, commentId },
  });

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(Number(createdAt)).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
        {user && user.id === userId && (
          <Button
            as="div"
            floated="right"
            disabled={loading}
            color="google plus"
            onClick={deleteComment}
          >
            <Icon name="trash" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentsCount
      comments {
        id
      }
    }
  }
`;
