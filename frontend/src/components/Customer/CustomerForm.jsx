import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import { getCustomer, saveCustomer } from "../../services/customerService";
import { toast } from "react-toastify";

const CustomerForm = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    membership: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();



  const mapToViewModel = (customer) => {
    return {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      membership: customer.membership,
    };
  };

  useEffect(() => {
    const populateCustomer = async () => {
      const customerId = id;
      if (customerId === "new") return;
      try {
        const { data: customer } = await getCustomer(customerId);
        setData(mapToViewModel(customer));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          toast.error(err.message);
          navigate("*");
        }
      }
    };
    populateCustomer();
  }, [id]);

  const submitCustomer = async (id, submittedData) => {
    try{
      if (id === "new") {
        await saveCustomer(submittedData);
        toast.success('New Customer Added')
      } else {
        await saveCustomer({ _id: id, ...submittedData });
        toast.success('Customer Edited Successfully')
      }
      navigate("/customers");
    }catch(err){
      toast.error(err.message);
    }
  };

  const onSubmit = (submittedData) => {
    console.log(submittedData);
    submitCustomer(id, submittedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Customer Name
        </label>
        <input
          {...register("name")}
          type="text"
          defaultValue={data["name"]}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone No
        </label>
        <input
          {...register("phone")}
          type="number"
          defaultValue={data["phone"]}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          defaultValue={data["email"]}
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Membership</label>
        <select
          {...register("membership")}
          defaultValue={data["membership"]}
          className="form-control"
        >
          <option value=""> -- Want Membership -- </option>
          <option value={"normal"}>No</option>
          <option value={"bronze"}>Bronze</option>
          <option value={"silver"}>Silver</option>
          <option value={"gold"}>Gold</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CustomerForm;
