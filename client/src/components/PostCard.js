import moment from "moment";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { Card, Image } from "semantic-ui-react";

import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentButton from "./CommentButton";
import { AuthContext } from "../context/auth";

export default function PostCard({
  post: {
    id: postId,
    body,
    userId,
    username,
    createdAt,
    likes,
    likesCount,
    commentsCount,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${postId}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        {/* : See if gql can pass createdAt as a number instead of a string */}
        <Card.Meta>{moment(Number(createdAt)).fromNow()}</Card.Meta>
        <Card.Description>{`${body.substr(0, 20)}...`}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton postId={postId} likes={likes} likesCount={likesCount} />
        <CommentButton postId={postId} commentsCount={commentsCount} />
        {user && user.id === userId && <DeleteButton postId={postId} />}
      </Card.Content>
    </Card>
  );
}
