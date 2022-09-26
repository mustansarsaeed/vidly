import React, { Component } from "react";

function Input({ name, label, value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        className="form-control"
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        // ref={username}
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
