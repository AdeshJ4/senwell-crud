import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const NavBar = ({ user }) => {
  const [userData, setUserData] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser(user._id);
        setUserData(data);
      } catch (err) {
        toast.error("Failed to fetch User.");
      }
    };
    fetchUser();
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Senwell
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarToggleExternalContent"
        >
          {user && (
            <>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                {user && (
                  <li className="nav-item me-3">
                    <NavLink className="nav-item nav-link" to="/profile">
                      <img
                        src={userData.profilePicture}
                        alt="Profile"
                        className="profile-picture"
                      />
                    </NavLink>
                  </li>
                )}
                <li className="nav-item me-3">
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </>
          )}

          {!user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
              <li className="nav-item me-3">
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
