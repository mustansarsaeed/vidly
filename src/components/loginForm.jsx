import React, { Component, useEffect, useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

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

  function handleSubmit(e) {
    e.preventDefault();

    const validatedErrors = validate();
    console.log(validatedErrors);
    setErrors(validatedErrors);

    if (validatedErrors) return;
  }

  function handleOnChange({ currentTarget: input }) {
    const cErrors = { ...errors };
    const errorMessage = validateProperty(input);

    if (errorMessage) cErrors[input.name] = errorMessage;
    else delete cErrors[input.name];

    const newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);

    console.log("newAccount=", newAccount);
    console.log("cErrors=", cErrors);
    setErrors(cErrors);
  }

  function validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);
    if (!error) return null;
    const cErrors = {};
    for (let item of error.details) cErrors[item.path[0]] = item.message;

    return cErrors;
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: value };
    const subSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, subSchema);

    return error ? error.details[0].message : null;
  }

  const username = React.createRef();

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          error={errors !== null ? errors.username : null}
          onChange={handleOnChange}
        />

        <Input
          name="password"
          label="Password"
          value={account.password}
          error={errors !== null ? errors.password : null}
          onChange={handleOnChange}
        />

        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
