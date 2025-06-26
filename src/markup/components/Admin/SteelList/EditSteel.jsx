import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import steelService from "../../../../services/steel.service";
import AdminMenu from "../AdminMenu/AdminMenu";

function EditSteel() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [steel, setSteel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!id) {
      setError("Invalid steel ID.");
      setLoading(false);
      return;
    }

    const fetchSteel = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await steelService.getSteelById(id);
        let data = response;
        if (response && response.json) {
          data = await response.json();
        }
        if (data && (data.status === "success" || data.ok)) {
          setSteel(data.data || data);
        } else {
          setError((data && data.message) || "Failed to fetch steel.");
        }
      } catch (err) {
        setError("Error fetching steel.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSteel();
  }, [id]);

  const handleChange = (e) => {
    setSteel({
      ...steel,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await steelService.updateSteel(id, steel);
      const data = await response.json();

      if (data.status === "success") {
        setSuccess("Steel updated successfully!");
        setTimeout(() => navigate("/admin/steels"), 1200);
      } else {
        setError(data.message || "Failed to update steel.");
      }
    } catch (err) {
      setError("Error updating steel.");
      console.log(err)
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!steel) return null;

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
              <h2 className="mb-3 text-center text-primary fw-bold">
                Edit Steel
              </h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="steel_image"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="steel_type"
                    value={steel.steel_type || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Weight (tons)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="steel_weight"
                    value={steel.steel_weight || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Price per Ton
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="steel_price_per_ton"
                    value={steel.steel_price_per_ton || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Total Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="steel_total_price"
                    value={steel.steel_total_price || ""}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-bold py-2 mt-2"
                >
                  Update Steel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditSteel;
