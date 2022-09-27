import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

export function handleSubmit(e, data, schema) {
  e.preventDefault();

  const validatedErrors = validate(data, schema);
  return validatedErrors;
}

export function handleOnChange(input, errors, data, schema) {
  const cErrors = { ...errors };
  const errorMessage = validateProperty(input, schema);

  if (errorMessage) cErrors[input.name] = errorMessage;
  else delete cErrors[input.name];

  const newData = { ...data };
  newData[input.name] = input.value;

  return { error: cErrors, data: newData };
}

export function validate(data, schema) {
  const options = { abortEarly: false };
  const { error } = Joi.validate(data, schema, options);
  if (!error) return null;
  const cErrors = {};
  for (let item of error.details) cErrors[item.path[0]] = item.message;

  return cErrors;
}

export function validateProperty({ name, value }, schema) {
  const obj = { [name]: value };
  const subSchema = { [name]: schema[name] };
  const { error } = Joi.validate(obj, subSchema);

  return error ? error.details[0].message : null;
}

export function renderButton(label, isDisabled) {
  return (
    <button disabled={isDisabled} className="btn btn-primary">
      {label}
    </button>
  );
}

export function renderInput(
  name,
  label,
  data,
  errors,
  doHandle,
  type = "text"
) {
  return (
    <Input
      type={type}
      name={name}
      label={label}
      value={data[name]}
      error={errors !== null ? errors[name] : null}
      onChange={doHandle}
    />
  );
}

export function renderSelect(name, label, data, errors, doHandle, options) {
  return (
    <Select
      name={name}
      label={label}
      value={data[name]}
      options={options}
      error={errors !== null ? errors[name] : null}
      onChange={doHandle}
    />
  );
}
