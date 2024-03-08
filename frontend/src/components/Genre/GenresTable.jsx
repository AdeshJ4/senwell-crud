import auth from "../../services/authService";
import { Link } from "react-router-dom";
import Table from "../common/Table";
import _ from "lodash";
import { memo } from "react";

const GenresTable = ({ genres, sortColumn, onSort, onDelete }) => {
  // column fields
  const columns = [
    {
      path: "name",
      label: "Name",
      content: (genre) => <Link to={`/genres/${genre._id}`}>{genre.name}</Link>,
    },
  ];

  // admin delete operation
  const deleteColumn = {
    key: "delete",
    content: (genre) => (
      <button onClick={() => onDelete(genre)} className="btn btn-danger btn-sm">
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
        data={genres}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};

export default memo(GenresTable);
