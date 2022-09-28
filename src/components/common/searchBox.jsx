import React, { Component } from "react";

function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control m-3"
      placeholder="Search ..."
      value={value}
      name="query"
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}

export default SearchBox;
