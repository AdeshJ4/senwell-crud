import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getGenre, saveGenre } from "../../services/genreService";
import { toast } from "react-toastify";

const GenreForm = () => {
  const [data, setData] = useState({
    name: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();

  const populateGenre = async () => {
    const genreId = id;
    if (genreId === "new") return;
    try {
      const { data: genre } = await getGenre(genreId);
      setData(mapToViewModel(genre));
    } catch (ex) {
      if (ex.response && ex.response.status === 404) navigate("*");
    }
  };

  const mapToViewModel = (genre) => {
    return {
      _id: genre._id,
      name: genre.name,
    };
  };

  useEffect(() => {
    populateGenre();
  }, [id]);

  const submitGenre = async (id, submittedData) => {
    try {
      if (id === "new") {
        await saveGenre(submittedData);
        toast.success('New Genre Added');
      } else {
        await saveGenre({ _id: id, ...submittedData });
        toast.success('Genre Edited Successfully');
      }
      navigate("/genres");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = (submittedData) => {
    submitGenre(id, submittedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Genre Name
        </label>
        <input
          {...register("name")}
          type="text"
          defaultValue={data["name"]}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default GenreForm;
