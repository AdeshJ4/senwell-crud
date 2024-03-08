import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import { getGenres } from "../../services/genreService";
import { getMovie, saveMovie } from "../../services/movieService";
import { toast } from "react-toastify";

const MovieForm = () => {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, register, getValues } = useForm();

  const populateGenres = async () => {
    try {
      const { data: genresData } = await getGenres();
      setGenres(genresData);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const populateMovie = async () => {
    const movieId = id;
    if (movieId === "new") return;
    try {
      const { data: movie } = await getMovie(movieId);
      setData(mapToViewModel(movie));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error(err.message);
        navigate("*");
      }
    }
  };

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const fetchData = () => {
    populateGenres();
    populateMovie();
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const submitMovie = async (id, submittedData) => {
    try {
      if (id === "new") {
        await saveMovie(submittedData);
        toast.success("New Movie Added");
      } else {
        await saveMovie({ _id: id, ...submittedData });
        toast.success("Movie Edited Successfully");
      }
      navigate("/movies");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = (submittedData) => {
    console.log(submittedData);
    submitMovie(id, submittedData);
  };

  return (
    <div className="row">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Movie Name
          </label>
          <input
            {...register("title")}
            type="text"
            defaultValue={data["title"]}
            className="form-control"
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Genre</label>
          <select
            {...register("genreId")}
            defaultValue={data["genreId"]}
            className="form-control"
          >
            <option value="">Select Genre -- </option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">number In Stock</label>
          <input
            {...register("numberInStock")}
            type="number"
            defaultValue={data["numberInStock"]}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            daily Rental Rate
          </label>
          <input
            {...register("dailyRentalRate")}
            type="number"
            defaultValue={data["dailyRentalRate"]}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
