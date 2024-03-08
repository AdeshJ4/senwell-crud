import { useState, useEffect, createContext } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
// import SideBar from "./components/Sidebar";
import Genre from "./components/Genre/Genre";
import GenreForm from "./components/Genre/GenreForm";
import Movies from "./components/Movie/Movies";
import MovieForm from "./components/Movie/MovieForm";
import Customer from "./components/Customer/Customer";
import CustomerForm from "./components/Customer/CustomerForm";
import Rental from "./components/Rentals/Rental";
import RentalForm from "./components/Rentals/RentalForm";
import Users from "./components/User/Users";
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">{/* <SideBar /> */}</div>
          <div className="col-md-9">
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
                <Route
                  path="/movies"
                  element={<ProtectedRoute Component={Movies} user={user} />}
                />
                <Route
                  path="/movies/:id"
                  element={<ProtectedRoute Component={MovieForm} />}
                />
                <Route
                  path="/users"
                  element={<ProtectedRoute Component={Users} />}
                />
                <Route
                  path="/customers"
                  element={<ProtectedRoute Component={Customer} user={user} />}
                />
                <Route
                  path="/customers/:id"
                  element={<ProtectedRoute Component={CustomerForm} />}
                />
                <Route
                  path="/genres"
                  element={<ProtectedRoute Component={Genre} user={user} />}
                />
                <Route
                  path="/genres/:id"
                  element={<ProtectedRoute Component={GenreForm} />}
                />
                <Route
                  path="/rentals"
                  element={<ProtectedRoute Component={Rental} user={user} />}
                />
                <Route
                  path="/rentals/:id"
                  element={<ProtectedRoute Component={RentalForm} />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
