import React, { Component } from "react";

function ListGroup(props) {
  const { items, onItemSelected, currentItem, textProperty, valueProperty } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            key={item[textProperty]}
            className={
              currentItem._id === item[valueProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelected(item)}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
