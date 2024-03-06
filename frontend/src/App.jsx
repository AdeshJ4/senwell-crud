import { useState, useEffect, createContext } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

import auth from "./services/authService";
import Profile from "./components/Profile";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutForm />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<ProtectedRoute Component={Profile} user={user} />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
