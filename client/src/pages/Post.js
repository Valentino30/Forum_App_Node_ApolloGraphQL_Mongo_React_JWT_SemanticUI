import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition, Card } from "semantic-ui-react";

import { GET_POST } from "../utils/graphql";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import CommentForm from "../components/CommentForm";
import CommentCard from "../components/CommentCard";

export default function Post({ match }) {
  const { postId } = match.params;
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });

  if (loading) return <h1 className="page-title">Loading...</h1>;
  if (error) return <h1 className="page-title">{`Error: ${error.message}`}</h1>;

  const { comments } = data.getPost;

  return (
    <Grid columns={1}>
      <Grid.Row>
        <Grid.Column>
          <PostCard post={data.getPost} />
        </Grid.Column>
        <Grid.Column>
          {user && (
            <Card fluid>
              <Card.Content>
                <CommentForm postId={postId} />
              </Card.Content>
            </Card>
          )}
        </Grid.Column>
        <Transition.Group animation="fly right" duration={500}>
          {comments &&
            comments.map((comment) => (
              <Grid.Column key={comment.id}>
                <CommentCard postId={postId} comment={comment} />
              </Grid.Column>
            ))}
        </Transition.Group>
      </Grid.Row>
    </Grid>
  );
}
