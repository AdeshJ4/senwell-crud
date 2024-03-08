import React, { memo } from "react";
import auth from "../../services/authService";
import { Link } from "react-router-dom";
import Like from "../common/Like";
import _ from "lodash";
import Table from "../common/Table";

const MoviesTable = ({ movies, sortColumn, onSort, onLike, onDelete }) => {
  // column fields
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
  ];

  // admin delete operation
  const deleteColumn = {
    key: "delete",
    label: "Delete",
    content: (movie) => (
      <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">
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
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </>
  );
};

export default memo(MoviesTable);
