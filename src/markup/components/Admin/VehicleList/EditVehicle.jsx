import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vehicleService from "../../../../services/vehicle.service";
import AdminMenu from "../AdminMenu/AdminMenu";

function EditVehicle() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const navigate = useNavigate();

  const api_url = "https://backend-archer.onrender.com"

  useEffect(() => {
    const fetchVehicle = async () => {
      setError("");
      setLoading(true);
      try {
        const response = await vehicleService.getVehicle(id);
        if (!response.ok) {
          setError("Vehicle not found.");
          setLoading(false);
          return;
        }
        let data = response;
        // If using fetch, parse JSON
        if (response && response.json) {
          data = await response.json();
        }
        if (data && (data.status === "success" || data.ok)) {
          setVehicle(data.data || data);
        } else {
          setError((data && data.message) || "Failed to fetch vehicle.");
        }
      } catch (err) {
        setError("Error fetching vehicle.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleChange = (e) => {
    if (!vehicle) return;
    const { name, value, files } = e.target;
    if (name === "vehicle_image" && files && files[0]) {
      setNewImageFile(files[0]);
    } else {
      setVehicle({ ...vehicle, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let updatedVehicle = { ...vehicle };

      // If a new image is selected, upload it first
      if (newImageFile) {
        const formData = new FormData();
        formData.append("image", newImageFile);
        const uploadRes = await fetch(`${api_url}/api/upload`, {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.error || "Image upload failed");
        updatedVehicle.vehicle_image = uploadData.imagePath;
      }

      // Now update the vehicle
      const response = await fetch(`${api_url}/api/vehicle/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedVehicle),
      });
      const data = await response.json();
      if (response.ok) {
        setVehicle(data.data || data);
        setSuccess(true);
        setTimeout(() => {
          navigate("/admin/vehicles");
        }, 1000);
      } else {
        setError((data && data.message) || "Failed to update vehicle.");
        setSuccess(false);
      }
    } catch (err) {
      setError("Error updating vehicle.");
      setSuccess(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!vehicle) return null;

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
          <div className="col-md-9 edit-admin-form-wrapper p-4">
            <h2 className="mb-3 text-center text-primary fw-bold">
              Edit Vehicle
            </h2>

            <div className="admin-alerts-container my-3">
              {error && (
                <div className="alert alert-danger custom-alert">{error}</div>
              )}
              {success && (
                <div className="alert alert-success custom-alert">
                  {success}
                </div>
              )}
            </div>
            {vehicle && (
              <form onSubmit={handleSubmit} className="edit-vehicle-form">
                <div className="mb-3">
                  <label className="form-label">Vehicle Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="vehicle_image"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Make</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicle_make"
                    value={vehicle.vehicle_make || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Model</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicle_model"
                    value={vehicle.vehicle_model || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Year</label>
                  <input
                    type="number"
                    className="form-control"
                    name="vehicle_year"
                    value={vehicle.vehicle_year || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicle_type"
                    value={vehicle.vehicle_type || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mileage</label>
                  <input
                    type="number"
                    className="form-control"
                    name="vehicle_mileage"
                    value={vehicle.vehicle_mileage || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicle_tag"
                    value={vehicle.vehicle_tag || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Serial</label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicle_serial"
                    value={vehicle.vehicle_serial || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Color</label>
                  <input
                    type="color"
                    className="form-control"
                    name="vehicle_color"
                    value={vehicle.vehicle_color || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Total Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="vehicle_total_price"
                    value={vehicle.vehicle_total_price || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                {success && (
                  <div className="alert alert-success">
                    Vehicle added successfully!
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger">{error}</div>
                )}

                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Update Vehicle
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditVehicle;
