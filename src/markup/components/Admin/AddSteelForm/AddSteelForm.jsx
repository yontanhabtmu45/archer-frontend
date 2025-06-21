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
            // window.location.href = '/admin/vehicle';
            window.location.href = "/admin"; // Redirect to the vehicles page
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
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new vehicle</h2>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      {serverError && (
                        <div className="validation-error" role="alert">
                          {serverError}
                        </div>
                      )}
                      <input
                        type="file"
                        name="steel_image"
                        value={steel_image}
                        onChange={(event) => setImage(event.target.value)}
                        placeholder="steel Image"
                        required
                      />
                      {imageRequired && (
                        <div className="validation-error" role="alert">
                          {imageRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="steel_type"
                        value={steel_type}
                        onChange={(event) => setType(event.target.value)}
                        placeholder="steel Type"
                        required
                      />
                      { typeRequired && (
                        <div className="validation-error" role="alert">
                          {typeRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="steel_weight"
                        value={steel_weight}
                        onChange={(event) => setWeight(event.target.value)}
                        placeholder="steel weight"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="number"
                        name="steel_price_per_ton"
                        value={steel_price_per_ton}
                        onChange={(event) => setPricePerTon(event.target.value)}
                        placeholder="steel price per ton in Birr"
                        required
                      />
                      { PriceRequired && (
                        <div className="validation-error" role="alert">
                          {PriceRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="number"
                        name="steel_total_price"
                        value={steel_total_price}
                        onChange={(event) => setTotalPrice(event.target.value)}
                        placeholder="steel total price"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add steel</span>
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
  )
}

export default AddSteelForm;
