import React, { Component, useEffect, useState } from "react";
import Joi from "joi-browser";
import {
  handleOnChange,
  handleSubmit,
  validate,
  renderButton,
  renderInput,
} from "./common/form";

function RegisterForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    name: "",
  });

  const schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  function doRegister(e) {
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
      <form onSubmit={doRegister}>
        {renderInput("username", "Username", account, errors, doHandle)}
        {renderInput(
          "password",
          "Password",
          account,
          errors,
          doHandle,
          "password"
        )}
        {renderInput("name", "Name", account, errors, doHandle)}
        {renderButton("Register", validate(account, schema))}
      </form>
    </div>
  );
}

export default RegisterForm;
