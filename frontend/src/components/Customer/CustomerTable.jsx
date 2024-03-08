import React, { memo } from "react";
import auth from "../../services/authService";
import { Link } from "react-router-dom";
import Like from "../common/Like";
import _ from "lodash";
import Table from "../common/Table";

const CustomerTable = ({ customers, sortColumn, onSort, onDelete }) => {
  // column fields
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (customer) => (
        <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
      ),
    },
    { path: "phone", label: "Phone" },
    { path: "email", label: "Email" },
    { path: "membership", label: "Membership" },
  ];

  // admin delete operation
  const deleteColumn = {
    key: "delete",
    content: (customer) => (
      <button
        onClick={() => onDelete(customer)}
        className="btn btn-danger btn-sm"
      >
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
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};

export default memo(CustomerTable);
