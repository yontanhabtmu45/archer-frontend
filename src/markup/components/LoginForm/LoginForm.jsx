import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// Importing the service
import { logIn, logOut } from "../../../services/login.service";
// import loginService from '../../../services/login.service'

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [admin_email, setEmail] = useState("");
  const [admin_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle client side validations here
    let valid = true; // Flag
    // Email validation
    if (!admin_email) {
      setEmailError("Please enter your email address first");
      valid = false;
    } else if (!admin_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(admin_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // Password has to be at least 6 characters long
    if (!admin_password || admin_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) {
      return;
    }
    // Handle form submission here
    const formData = {
      admin_email,
      admin_password,
    };
    //   console.log(formData)
    const loginAdmin = logIn(formData);
    //   console.log(loginAdmin);
    loginAdmin
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response.status === "success") {
          // Save the user in the local storage
          if (response.data.admin_token) {
            // console.log(response.data);
            localStorage.setItem("admin", JSON.stringify(response.data));
          }
          // Redirect the user to the dashboard
          // navigate('/admin');
        //   console.log(location);
          if (location.pathname === "/login") {
            // navigate('/admin');
            // window.location.replace('/admin');
            // To home for now
            window.location.replace("/admin");
          } else {
            window.location.reload();
          }
        } else {
          // Show an error message
          setServerError(response.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setServerError("An error has occurred. Please try again later." + err);
      });
  };

  return (
    <div className="login-page-container">
      <h2 className="login-header">Login</h2>
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="row ">
            <div className="form-group col-md-12">
              {serverError && (
                <div className="validation-error" role="alert">
                  {serverError}
                </div>
              )}
              <input
                type="email"
                name="admin_email"
                value={admin_email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
              {emailError && (
                <div className="validation-error" role="alert">
                  {emailError}
                </div>
              )}
            </div>

            <div className="form-group col-md-12">
              <input
                type="password"
                name="admin_password"
                value={admin_password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              {passwordError && (
                <div className="validation-error" role="alert">
                  {passwordError}
                </div>
              )}
            </div>

            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
