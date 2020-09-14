import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { GET_POSTS } from "../utils/graphql";
import { AuthContext } from "../context/auth";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <h1 className="page-title">Loading posts...</h1>;

  if (error)
    return (
      <h1 className="page-title">
        Oops! Something went wrong, please refresh the page.
      </h1>
    );

  if (!user && data.getPosts.length === 0)
    return (
      <h1 className="page-title">
        No one posted anything yet! Register and start posting yourself!
      </h1>
    );

  return (
    <div>
      <Grid columns={3}>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          <Transition.Group animation="fly right" duration={500}>
            {data &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        </Grid.Row>
      </Grid>
    </div>
  );
}
