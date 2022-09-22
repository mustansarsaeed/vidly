import React, { Component } from "react";

function TableHeader(props) {
  const { columns, sortColumn, onSort } = props;
  function raiseSort(path) {
    const sColumn = { ...sortColumn };
    if (sColumn.path === path) {
      sColumn.order = sColumn.order === "asc" ? "desc" : "asc";
    } else {
      sColumn.path = path;
      sColumn.order = "asc";
    }

    onSort(sColumn);
  }

  function renderSortIcon(column) {
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  }

  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => raiseSort(column.path)}
            >
              {column.label}
              {renderSortIcon(column)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default TableHeader;
