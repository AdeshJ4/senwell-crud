import _ from "lodash";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteGenre, getGenres } from "../../services/genreService";
import { paginate } from "../../utils/paginate";
import { Link } from "react-router-dom";
import GenresTable from "./GenresTable";
import Pagination from "../common/Pagination";
import SearchBox from "../common/SearchBox";

const Genre = ({ user }) => {
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" }); // movie name is title
  const count = genres.length;

  // fetch movies and genres

  useEffect(() => {
    async function fetchGenre() {
      try {
        //It's extracting the data property from the object returned by getGenres() and renaming it to genreData.
        const { data: genreData } = await getGenres();
        setGenres(genreData);
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchGenre();
  }, []);

  // delete movies
  async function handleDelete(genre) {
    const originalGenres = [...genres]; //Create a copy of the original array of movies
    setGenres(genres.filter((g) => g._id !== genre._id));
    try {
      await deleteGenre(genre._id);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(err.message);
      }
      setGenres(originalGenres);
    }
  }

  // you will get page no from Pagination and according to that you have to fetch movies
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // sorting movies
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  // Filters and sorts the movies based on the current state (e.g., search query, selected genre, sort column, etc.).
  // Utilizes the paginate function to get a subset of movies for the current page.
  const getPagedData = () => {
    const allGenres = [...genres];
    let filtered = allGenres;

    if (searchQuery)
      filtered = allGenres.filter((g) =>
        g.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pagedGenres = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: pagedGenres };
  };

  if (count === 0) <p>There are no Genres in the database.</p>;
  const { totalCount, data } = getPagedData();

  return (
    <div className="row">
      <div className="col">
        {user && (
          <Link
            to="/genres/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Genre
          </Link>
        )}
        <p>Showing {totalCount} genres in the database.</p>
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <GenresTable
          genres={data}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize} // 10 movies on one page
          currentPage={currentPage} // initially one
          onPageChange={handlePageChange} // event handle to change page number
        />
      </div>
    </div>
  );
};

export default Genre;
