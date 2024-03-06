import { useNavigate } from "react-router-dom";
import auth from "../../services/authService";
import { memo, useEffect } from "react";

const ProtectedRoute = ({ Component, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.getCurrentUser()) {
      navigate("/login");
    }
  }, []);

  return <Component user={user} />;
};

export default memo(ProtectedRoute);
