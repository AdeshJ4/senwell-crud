import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "font-awesome/css/font-awesome.css";
import auth from "../services/authService";
import { toast } from "react-toastify";

const schema = z.object({
  email: z
    .string()
    .min(11, { message: "Email should be 11 character long" })
    .max(255)
    .email(),
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

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await auth.login(data.email, data.password);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred while logging in");
      }
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
              Sign In
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
