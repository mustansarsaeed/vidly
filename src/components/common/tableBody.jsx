import React, { Component } from "react";
import _ from "lodash";
function TableBody(props) {
  const { items, columns } = props;

  function renderCell(item, column) {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  }
  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          {columns.map((column) => (
            <td key={column.path || column.key}>{renderCell(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
