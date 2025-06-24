import React, { useState } from "react";

import vehicleService from "../../../../services/vehicle.service";

function AddVehicleForm() {
  const [vehicle_image, setImage] = useState("");
  const [vehicle_year, setYear] = useState("");
  const [vehicle_make, setMake] = useState("");
  const [vehicle_model, setModel] = useState("");
  const [vehicle_type, setType] = useState("");
  const [vehicle_mileage, setMileage] = useState("");
  const [vehicle_tag, setTag] = useState("");
  const [vehicle_serial, setSerial] = useState("");
  const [vehicle_color, setColor] = useState("");
  const [vehicle_total_price, setTotalPrice] = useState("");

  // ERRORS
  const [imageRequired, setImageRequired] = useState("");
  const [modelRequired, setModelRequired] = useState("");
  const [totalPriceRequired, setTotalPriceRequired] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    // Prevent the default behavior of the form
    e.preventDefault();
    // Handle client side validations
    let valid = true; // Flag

    // Image is required
    if (!vehicle_image) {
      setImageRequired("vehicle image is required");
      valid = false;
    } else {
      setImageRequired("");
    }

    // Model is required
    if (!vehicle_model) {
      setModelRequired("vehicle Model is required");
      valid = false;
    } else {
      setModelRequired("");
    }

    // Price is required
    if (!vehicle_total_price) {
      setTotalPriceRequired("vehicle Model is required");
      valid = false;
    } else {
      setTotalPriceRequired("");
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }

    const formData = {
      vehicle_image,
      vehicle_make,
      vehicle_model,
      vehicle_year,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
      vehicle_total_price,
    };

    // Pass the form data to the service
    const newVehicle = vehicleService.createVehicle(formData);
    newVehicle
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // If Error is returned from the API server, set the error message
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // Redirect to the vehicle page after 2 seconds
          // For now, just redirect to the home page
          setTimeout(() => {
            // window.location.href = '/admin/vehicle';
            window.location.href = "/admin/vehicles"; // Redirect to the vehicles page
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
    <form
      className="add-vehicle-form p-4 rounded shadow-sm bg-white"
      onSubmit={handleSubmit}
      style={{ maxWidth: 600, margin: "0 auto" }}
    >
      <h3 className="mb-3 text-primary fw-bold">Add New Vehicle</h3>
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Image <span className="text-danger">*</span>
        </label>
        <input
          type="file"
          className={`form-control ${imageRequired ? "is-invalid" : ""}`}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setImageRequired(false);
          }}
        />
        {imageRequired && (
          <div className="invalid-feedback">Image is required.</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Year</label>
        <input
          type="number"
          className="form-control"
          value={vehicle_year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Enter year"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Make</label>
        <input
          type="text"
          className="form-control"
          value={vehicle_make}
          onChange={(e) => setMake(e.target.value)}
          placeholder="Enter make"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Model <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className={`form-control ${modelRequired ? "is-invalid" : ""}`}
          value={vehicle_model}
          onChange={(e) => {
            setModel(e.target.value);
            setModelRequired(false);
          }}
          placeholder="Enter model"
        />
        {modelRequired && (
          <div className="invalid-feedback">Model is required.</div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Type</label>
        <input
          type="text"
          className="form-control"
          value={vehicle_type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter type"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Mileage</label>
        <input
          type="number"
          className="form-control"
          value={vehicle_mileage}
          onChange={(e) => setMileage(e.target.value)}
          placeholder="Enter mileage"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Tag</label>
        <input
          type="text"
          className="form-control"
          value={vehicle_tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Enter tag"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Serial <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          value={vehicle_serial}
          onChange={(e) => setSerial(e.target.value)}
          placeholder="Enter serial"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Color</label>
        <input
          type="text"
          className="form-control"
          value={vehicle_color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Enter color"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">
          Total Price <span className="text-danger">*</span>
        </label>
        <input
          type="number"
          className={`form-control ${totalPriceRequired ? "is-invalid" : ""}`}
          value={vehicle_total_price}
          onChange={(e) => {
            setTotalPrice(e.target.value);
            setTotalPriceRequired(false);
          }}
          placeholder="Enter total price"
        />
        {totalPriceRequired && (
          <div className="invalid-feedback">Total price is required.</div>
        )}
      </div>
      {success && (
        <div className="alert alert-success">Vehicle added successfully!</div>
      )}
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-2">
        Add Vehicle
      </button>
    </form>
  );
}

export default AddVehicleForm;
