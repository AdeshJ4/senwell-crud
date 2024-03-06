import { useEffect } from "react";
import auth from "../services/authService";

const LogoutForm = () => {
  useEffect(() => {
    auth.logout();
    window.location = "/";
  }, []);

  return null;
};

export default LogoutForm;
