import React, { memo } from "react";
import auth from "../../services/authService";
import _ from "lodash";
import Table from "../common/Table";

const UsersTable = ({ users, sortColumn, onSort, onDelete }) => {
  const columns = [
    {
      path: "name",
      label: "Name",
    },
    { path: "email", label: "Email" },
  ];

  // admin delete operation
  const deleteColumn = {
    key: "delete",
    label: "Delete",
    content: (user) => (
      <button onClick={() => onDelete(user)} className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  };

  // check user is Admin or not
  const user = auth.getCurrentUser();
  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <>
      <Table
        columns={columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};

export default memo(UsersTable);
