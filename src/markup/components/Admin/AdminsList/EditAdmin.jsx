import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminService from "../../../../services/admin.service";
import AdminMenu from "../AdminMenu/AdminMenu";

function EditAdmin() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid admin ID.");
      setLoading(false);
      return;
    }

    const fetchAdmin = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await adminService.getAdmin(id);
        let data = response;
        // If using fetch, parse JSON
        if (response && response.json) {
          data = await response.json();
        }
        if (data && (data.status === "success" || data.ok)) {
          setAdmin(data.data || data);
        } else {
          setError((data && data.message) || "Failed to fetch admin.");
        }
      } catch (err) {
        setError("Error fetching admin.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    if (!admin) return;
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await adminService.updateAdmin(id, admin);
      const data = await response.json();
      if (data.status === "success") {
        setSuccess("Admin updated successfully!");
        setTimeout(() => Navigate("/admin/admins"), 1200);
      } else {
        setError(data.message || "Failed to update admin");
      }
    } catch (err) {
      setError("Error updating admin.");
      console.log(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!admin) return null;

  return (
    <section
    className="edit-admin-section d-flex align-items-center justify-content-center"
    style={{ minHeight: "80vh", background: "#f7f4e7" }}
  >
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-3 admin-left-side mb-4 mb-md-0">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="edit-admin-form-wrapper p-4 rounded shadow-sm bg-white">
            <h2 className="mb-3 text-center text-primary fw-bold">Edit Admin</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            {admin && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="admin_first_name"
                    value={admin.admin_first_name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="admin_last_name"
                    value={admin.admin_last_name || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="admin_email"
                    value={admin.admin_email || ""}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    name="admin_phone"
                    value={admin.admin_phone || ""}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-2">
                  Update Admin
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}

export default EditAdmin;
