import React, { useState } from "react";

import adminService from "../../../../services/admin.service";

function AddAdminForm() {
  const [admin_role, setRole] = useState("");
  const [admin_email, setEmail] = useState("");
  const [admin_user_name, setUserName] = useState("");
  const [admin_first_name, setFirstName] = useState("");
  const [admin_last_name, setLastName] = useState("");
  const [admin_phone, setPhoneNumber] = useState("");
  const [admin_password, setPassword] = useState("");
  // const [active_admin, setActive_admin] = useState(1);
  const [company_role_id, setCompany_role_id] = useState('');
  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag
    // First name is required
    if (!admin_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // Email is required
    if (!admin_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!admin_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
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
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    const formData = {
      admin_email,
      admin_user_name,
      admin_first_name,
      admin_last_name,
      admin_phone,
      admin_password,
      // active_admin,
      company_role_id,
    };

    // Pass the form data to the service
    const newAdmin = adminService.createAdmin(formData);
    newAdmin
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // Redirect to the admins page after 2 seconds
          // For now, just redirect to the home page
          setTimeout(() => {
            // window.location.href = '/admin/admins';
            window.location.href = "/admin/admins"; // Redirect to the admins page
          }, 2000);
        }
      })
      // Handle Catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <section className="contact-section py-4" style={{ background: "#f7f4e7", minHeight: "100vh" }}>
      <div className="auto-container">
        <div className="contact-title mb-4">
          <h2 className="fw-bold text-primary">Add a new admin</h2>
        </div>
        <div className="row justify-content-center">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form p-4 rounded shadow-sm bg-white">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md-6 mb-3">
                      <label className="form-label fw-semibold">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={admin_first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <label className="form-label fw-semibold">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={admin_last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12 mb-3">
                      <label className="form-label fw-semibold">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={admin_email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <label className="form-label fw-semibold">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={admin_password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 mb-3">
                      <label className="form-label fw-semibold">Role</label>
                      <select
                        className="form-control"
                        value={company_role_id}
                        onChange={(e) => setCompany_role_id(e.target.value)}
                        required
                      >
                        <option value="">Select role</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>
                    <div className="form-group col-md-12 mb-3">
                      {serverError && (
                        <div className="alert alert-danger" role="alert">
                          {serverError}
                        </div>
                      )}
                      {success && (
                        <div className="alert alert-success" role="alert">
                          Admin added successfully!
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-12">
                      <button type="submit" className="btn btn-primary w-100 fw-bold py-2">
                        Add Admin
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddAdminForm;
