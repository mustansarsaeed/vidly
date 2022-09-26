import React, { Component, useEffect, useState } from "react";
import Input from "./common/input";

function LoginForm() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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

    if (errorMessage.length == 0) {
      delete cErrors[input.name];
    } else {
      cErrors[input.name] = errorMessage;
    }

    setErrors(cErrors);

    const newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  }

  function validate() {
    const vErrors = {};
    if (account.username.trim().length === 0)
      vErrors.username = "Username field is requried.";

    if (account.password.trim().length === 0)
      vErrors.password = "Password field is requried.";

    return Object.keys(vErrors).length === 0 ? null : vErrors;
  }

  function validateProperty({ name, value }) {
    if (name === "username") {
      if (value.trim().length === 0) return "Username is required";
    }

    if (name === "password") {
      if (value.trim().length === 0) return "Password is required";
    }

    return "";
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

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
