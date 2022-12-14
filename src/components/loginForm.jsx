import React, { Component, useEffect, useState } from "react";
import Joi from "joi-browser";
import {
  handleOnChange,
  handleSubmit,
  validate,
  renderButton,
  renderInput,
} from "./common/form";

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

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={doSubmit}>
        {renderInput("username", "Username", account, errors, doHandle)}
        {renderInput(
          "password",
          "Password",
          account,
          errors,
          doHandle,
          "password"
        )}
        {renderButton("Login", validate(account, schema))}
      </form>
    </div>
  );
}

export default LoginForm;
