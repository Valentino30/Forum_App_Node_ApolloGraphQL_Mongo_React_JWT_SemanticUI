import { Form } from "semantic-ui-react";
import { gql } from "@apollo/react-hooks";
import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";

import { AuthContext } from "../context/auth";

export default function Register({ history }) {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [register, { loading }] = useMutation(REGISTER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register();
  };

  return (
    <div className="auth-form">
      <h1 className="page-title">Register</h1>
      <Form
        noValidate
        onSubmit={handleSubmit}
        className={loading ? "loading" : ""}
      >
        <Form.Input
          fluid
          type="text"
          name="username"
          placeholder="Username"
          value={values.username}
          error={errors.username}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          error={errors.password}
          onChange={handleChange}
        />
        <Form.Button fluid color="instagram">
          Register
        </Form.Button>
      </Form>
    </div>
  );
}

const REGISTER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;
