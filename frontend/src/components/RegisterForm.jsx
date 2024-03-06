import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../services/userService";

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must contain at least 2 characters" })
    .max(50),
  lastName: z
    .string()
    .min(2, { message: "Last Name must contain at least 2 characters" })
    .max(50),
  mobileNo: z.string().min(10).max(10),
  country: z
    .string()
    .min(2, { message: "country must contain at least 2 characters" })
    .max(50),
  email: z
    .string()
    .min(11, { message: "Email should be 11 character long" })
    .max(50)
    .email(),
  gender: z.enum(["male", "female", "other"], {
    message: "Select gender value",
  }),
  dateOfBirth: z
    .string()
    .refine((value) => /\d{4}-\d{2}-\d{2}/.test(value), {
      message: "Invalid date format, please use YYYY-MM-DD",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(26, {
      message: "Password must not exceed 26 characters",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => /\d/.test(value), {
      message: "Password must contain at least one numeric digit",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message: "Password must contain at least one special character",
    }),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      console.log("Data: ", data);
      await registerUser(data);
      window.location = "/login";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div
      className="row"
      style={{ background: "linear-gradient(to right, #0062E6, #33AEFF)" }}
    >
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">
              Sign Up
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* First Name */}
              <div className="form-floating mb-3">
                <input
                  {...register("firstName")}
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                />
                <label>First Name</label>
                {errors.firstName && (
                  <p className="text-danger">{errors.firstName.message}</p>
                )}
              </div>
              {/* Last Name */}
              <div className="form-floating mb-3">
                <input
                  {...register("lastName")}
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                />
                <label>Last Name</label>
                {errors.lastName && (
                  <p className="text-danger">{errors.lastName.message}</p>
                )}
              </div>

              {/* Mobile No */}
              <div className="form-floating mb-3">
                <input
                  {...register("mobileNo")}
                  type="number"
                  className="form-control"
                  placeholder="Mobile No"
                />
                <label>Mobile No</label>
                {errors.mobileNo && (
                  <p className="text-danger">{errors.mobileNo.message}</p>
                )}
              </div>

              {/* gender */}
              <div className="form-floating mb-3">
                <select {...register("gender")} className="form-select">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <label>Gender</label>
                {errors.gender && (
                  <p className="text-danger">{errors.gender.message}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-floating mb-3">
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                />
                <label>Date of Birth</label>
                {errors.dateOfBirth && (
                  <p className="text-danger">{errors.dateOfBirth.message}</p>
                )}
              </div>
              {/* Country */}
              <div className="form-floating mb-3">
                <input
                  {...register("country")}
                  type="text"
                  className="form-control"
                  placeholder="Enter country"
                />
                <label>country Name</label>
                {errors.country && (
                  <p className="text-danger">{errors.country.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="name@example.com"
                />
                <label>Email</label>
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-floating mb-3">
                <input
                  {...register("password")}
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
                <label>Password</label>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-floating mb-3">
                <input
                  {...register("confirmPassword", {
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                />
                <label>Confirm Password</label>
                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <div className="d-grid">
                <button
                  className="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                  style={{
                    fontSize: "0.9rem",
                    letterSpacing: "0.05rem",
                    padding: "0.75rem 1rem",
                  }}
                >
                  Sign Up
                </button>
              </div>

              <hr className="my-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
