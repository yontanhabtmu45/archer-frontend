import React, { useState } from "react";

import steelService from "../../../../services/steel.service";

function AddSteelForm() {
  const [steel_image, setImage] = useState("");
  const [steel_type, setType] = useState("");
  const [steel_weight, setWeight] = useState("");
  const [steel_price_per_ton, setPricePerTon] = useState("");
  const [steel_total_price, setTotalPrice] = useState("");

  // Errors
  const [imageRequired, setImageRequired] = useState(false);
  const [typeRequired, setTypeRequired] = useState(false);
  const [PriceRequired, setPriceRequired] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    // Image is required
    if (!steel_image) {
      setImageRequired("vehicle image is required");
      valid = false;
    } else {
      setImageRequired("");
    }

    // Type is required
    if (!steel_type) {
      setTypeRequired("steel type is required");
      valid = false;
    } else {
      setTypeRequired("");
    }

    // Price is required
    if (!steel_price_per_ton) {
      setPriceRequired("steel price per ton is required");
      valid = false;
    } else {
      setPriceRequired("");
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }

    const formData = {
      "image": steel_image,
      "type": steel_type,
      "weight": steel_weight,
      "price_per_ton": steel_price_per_ton,
      "total_price": steel_total_price,
    };

    // Pass the form data to the service
    const newSteel = steelService.createSteel(formData)
    newSteel
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
            // window.location.href = '/admin/steel';
            window.location.href = "/admin/steels"; // Redirect to the vehicles page
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
    <form className="add-steel-form p-4 rounded shadow-sm bg-white" onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
      <h3 className="mb-3 text-primary fw-bold">Add New Steel</h3>
      <div className="mb-3">
  <label className="form-label fw-semibold">Image <span className="text-danger">*</span></label>
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
  {imageRequired && <div className="invalid-feedback">Image is required.</div>}
</div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Type <span className="text-danger">*</span></label>
        <input
          type="text"
          className={`form-control ${typeRequired ? "is-invalid" : ""}`}
          value={steel_type}
          onChange={(e) => { setType(e.target.value); setTypeRequired(false); }}
          placeholder="Enter steel type"
        />
        {typeRequired && <div className="invalid-feedback">Type is required.</div>}
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Weight (tons)</label>
        <input
          type="number"
          className="form-control"
          value={steel_weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight"
        />
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Price per Ton <span className="text-danger">*</span></label>
        <input
          type="number"
          className={`form-control ${PriceRequired ? "is-invalid" : ""}`}
          value={steel_price_per_ton}
          onChange={(e) => { setPricePerTon(e.target.value); setPriceRequired(false); }}
          placeholder="Enter price per ton"
        />
        {PriceRequired && <div className="invalid-feedback">Price per ton is required.</div>}
      </div>
      <div className="mb-3">
        <label className="form-label fw-semibold">Total Price</label>
        <input
          type="number"
          className="form-control"
          value={steel_total_price}
          onChange={(e) => setTotalPrice(e.target.value)}
          placeholder="Enter total price"
        />
      </div>
      {success && <div className="alert alert-success">Steel added successfully!</div>}
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <button type="submit" className="btn btn-primary w-100 fw-bold py-2 mt-2">
        Add Steel
      </button>
    </form>
  )
}

export default AddSteelForm;
