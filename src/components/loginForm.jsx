import React, { Component, useEffect, useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import { handleOnChange, handleSubmit, validate } from "./common/form";

function LoginForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  function doSubmit(e) {
    const validatedErrors = handleSubmit(e, account, schema);
    setErrors(validatedErrors);

    if (validatedErrors) return;
  }

  function doHandle({ currentTarget: input }) {
    const { error, data } = handleOnChange(input, errors, account, schema);
    setAccount(data);
    setErrors(error);
  }

  const username = React.createRef();

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={doSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          error={errors !== null ? errors.username : null}
          onChange={doHandle}
        />

        <Input
          name="password"
          label="Password"
          value={account.password}
          error={errors !== null ? errors.password : null}
          onChange={doHandle}
        />

        <button
          disabled={validate(account, schema)}
          className="btn btn-primary"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
