import React, { useState } from "react";

import vehicleService from "../../../../services/vehicle.service";

import axios from "../../../../api/axios"

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

  const api_url = 'https://backend-archer.onrender.com'

  // ERRORS
  const [imageRequired, setImageRequired] = useState("");
  const [modelRequired, setModelRequired] = useState("");
  const [totalPriceRequired, setTotalPriceRequired] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageRequired("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Image validation
    if (!vehicle_image) {
      setImageRequired("vehicle image is required");
      valid = false;
    } else {
      setImageRequired("");
    }

    // Model validation
    if (!vehicle_model) {
      setModelRequired("vehicle Model is required");
      valid = false;
    } else {
      setModelRequired("");
    }

    // Price validation
    if (!vehicle_total_price) {
      setTotalPriceRequired("vehicle Model is required");
      valid = false;
    } else {
      setTotalPriceRequired("");
    }

    if (!valid) return;

    try {
      // 1. Upload image and get path
      const formData = new FormData();
      formData.append("image", vehicle_image);
      const uploadRes = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok)
        throw new Error(uploadData.error || "Image upload failed");
      // const uploadRes = await fetch(`${api_url}/api/upload`, {
      //   method: "POST",
      //   body: formData,
      // });
      // const imagePath = uploadRes.data.imagePath;
      // .catch(err => console.log(err))

      // 2. Prepare vehicle data
      const vehicleData = {
        vehicle_image: uploadData.imagePath,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color,
        vehicle_total_price,
      };

      // 3. Create vehicle
      const response = await vehicleService.createVehicle(vehicleData);
      const data = await response.json();
      console.log("Vehicle create response:", response, data);

      if (data && data.vehicle_iden_id) {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          window.location.href = "/admin/vehicles";
        }, 2000);
      } else {
        setServerError(data?.error || "Failed to add vehicle. Please try again.");
        setSuccess(false);
      }
    } catch (err) {
      setServerError("Failed to add vehicle. Please try again.");
      setSuccess(false);
    }
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
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
