import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";
import {
  deleteUser,
  getUsers,
  getUsersBySearchQuery,
} from "../../services/userService";
import UsersTable from "./UsersTable";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" }); // movie name is title
  const [count, setTotalCount] = useState();

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        let usersData;
        if (searchQuery) {
          usersData = await getUsersBySearchQuery(searchQuery, currentPage);
        } else {
          usersData = await getUsers(currentPage);
        }
        const sorted = _.orderBy(
          usersData.data.users,
          [sortColumn.path],
          [sortColumn.order]
        );
        setUsers(sorted);
        setTotalCount(usersData.data.count);
      } catch (err) {
        toast.error(err.message);
      }
    };
    fetchUsersData();
  }, [currentPage, searchQuery]);

  // delete users
  async function handleDelete(user) {
    const originalUsers = [...users];
    setUsers(users.filter((u) => u._id !== user._id));
    try {
      await deleteUser(user._id);
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.status === 404) {
        toast.error("This user has already been deleted.");
      }
      setUsers(originalUsers);
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // sorting users
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sorted = _.orderBy(users, [sortColumn.path], [sortColumn.order]);
    setUsers(sorted);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  if (count === 0) <p>There are no users in the database.</p>;

  return (
    <div className="row">
      <div className="col">
        <p class="text-muted">
          Showing <span class="text-primary">{count}</span> users in the
          database.
        </p>

        <SearchBox value={searchQuery} onChange={handleSearch} />

        <UsersTable
          users={users}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />

        <Pagination
          itemsCount={count}
          pageSize={pageSize} // 10 movies on one page
          currentPage={currentPage} // initially one
          onPageChange={handlePageChange} // event handle to change page number
        />
      </div>
    </div>
  );
};

export default Users;
