import React, { useMemo, useState } from "react";
import { saveRental } from "../../services/rentalService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RentalForm = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const addMovie = ({ movieId }) => {
    if (movieId && !selectedMovies.includes(movieId)) {
      setSelectedMovies([...selectedMovies, movieId]);
      setValue("movies", ""); // Clear the input field after adding the movie
    }
  };

  const removeMovie = (movieId) => {
    const updatedMovies = selectedMovies.filter((id) => id !== movieId);
    setSelectedMovies(updatedMovies);
  };

  const navigate = useNavigate();
  const { handleSubmit, register, setValue, getValues } = useForm();

  const onSubmit = async (submittedData) => {
    const { movies, ...filteredRentalData } = submittedData;
    try {
      await saveRental({ ...filteredRentalData, movies: selectedMovies });
      toast.success("New Rental Added");
      navigate("/rentals");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 mx-auto mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Customer Id</label>
            <input
              {...register("customerId")}
              type="text"
              className="form-control"
            />
          </div>

          <div className="row mb-3">
            <label htmlFor="form-label mb-3">Movies</label>
            <div className="col-md">
              <input
                {...register("movies")}
                type="text"
                className="form-control"
                placeholder="Enter Movie Id"
              />
            </div>
            <div className="col-md">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addMovie({ movieId: getValues("movies") })}
              >
                Add Movie
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Date Returned</label>
            <input
              {...register("dateReturned")}
              type="date"
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {selectedMovies.length > 0 && (
          <div className="mt-4">
            <h3>Selected Movies:</h3>
            <ul>
              {selectedMovies.map((movieId) => (
                <li
                  key={movieId}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {movieId}
                  <button
                    type="button"
                    // className="btn btn-danger btn-sm"
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => removeMovie(movieId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default RentalForm;