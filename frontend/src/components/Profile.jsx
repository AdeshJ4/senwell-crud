import React, { useState, useEffect, useContext, useRef } from "react";
import { getUser, updateUser } from "../services/userService";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [file, setFile] = useState();

  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      delete userData.profilePicture;
      formData.append("userData", JSON.stringify(userData));
      await updateUser(user._id, formData);
      toast.success("Profile updated successfully.");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile</h2>
      {userData ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Information</h5>

            {/* User Profile */}
            <div className="box-decoration">
              <label
                htmlFor="image-upload-input"
                className="image-upload-label"
              >
                {file ? file.name : "Choose an Image"}
              </label>
              <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    className="img-display-after"
                  />
                ) : (
                  <img
                    src={userData.profilePicture}
                    className="img-display-before"
                  />
                )}
                <input
                  type="file"
                  ref={inputRef}
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                {/* First Name */}
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Mobile No */}
                <div className="mb-3">
                  <label htmlFor="mobileNo" className="form-label">
                    Mobile No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNo"
                    name="mobileNo"
                    value={userData.mobileNo}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Gender */}
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={userData.gender}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                {/* Last Name */}
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Date of Birth */}
                <div className="mb-3">
                  <label htmlFor="dateOfBirth" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={userData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Country */}
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={userData.country}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled
              />
            </div>

            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};
export default Profile;
