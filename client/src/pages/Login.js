import { gql } from "@apollo/react-hooks";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";

import { AuthContext } from "../context/auth";

export default function Login({ history }) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    update(_, { data: { login: userData } }) {
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
    login();
  };

  return (
    <div className="auth-form">
      <h1 className="page-title">Login</h1>
      <Form
        noValidate
        onSubmit={handleSubmit}
        className={loading ? "loading" : ""}
      >
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
        <Form.Button fluid color="instagram">
          Login
        </Form.Button>
      </Form>
    </div>
  );
}

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      token
    }
  }
`;
