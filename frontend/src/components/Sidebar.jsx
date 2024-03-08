// import { NavLink } from "react-router-dom";
// import logo from "../images/companylogo.jpg";
// import "./Sidebar.css";

// const SideBar = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <a href="#">
//             <img src={logo} alt="company" />
//             <span className="nav-item">Code Info</span>
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <i className="fas fa-home"></i>
//             <span className="nav-item">Home</span>
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <i className="fas fa-user"></i>
//             <span className="nav-item">Profile</span>
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <i className="fas fa-wallet"></i>
//             <span className="nav-item">Wallet</span>
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <i className="fas fa-tasks"></i>
//             <span className="nav-item">Task</span>
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <i className="fas fa-chart-bar"></i>
//             <span className="nav-item">Analytics</span>
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <i className="fas fa-cog"></i>
//             <span className="nav-item">Setting</span>
//           </a>
//         </li>

//         <li>
//           <a href="#" className="logout">
//             <i className="fas fa-sign-out-alt"></i>
//             <span className="nav-item">Log out</span>
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default SideBar;
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/movies">
            <i className="bi bi-film me-2"></i> Movies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            activeClassName="active"
            to="/customers"
          >
            <i className="bi bi-person me-2"></i> Customers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/genres">
            <i className="bi bi-tag me-2"></i> Genres
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/rentals">
            <i className="bi bi-card-checklist me-2"></i> Rentals
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="active" to="/users">
            <i className="bi bi-shield-lock me-2"></i> Admin
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
