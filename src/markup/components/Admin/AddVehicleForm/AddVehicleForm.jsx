import React, { useState } from "react";

import vehicleService from "../../../../services/vehicle.service";

function AddVehicleForm() {
  const [vehicle_image, setImage] = useState("");
  const [vehicle_Year, setYear] = useState("");
  const [vehicle_Make, setMake] = useState("");
  const [vehicle_Model, setModel] = useState("");
  const [vehicle_Type, setType] = useState("");
  const [vehicle_Mileage, setMileage] = useState("");
  const [vehicle_Tag, setTag] = useState("");
  const [vehicle_Serial, setSerial] = useState("");
  const [vehicle_Color, setColor] = useState("");
  const [vehicle_Total_Price, setTotalPrice] = useState("");

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
    if (!vehicle_Model) {
      setModelRequired("vehicle Model is required");
      valid = false;
    } else {
      setModelRequired("");
    }

    // Price is required
    if (!vehicle_Total_Price) {
      setTotalPriceRequired("vehicle Model is required");
      valid = false;
    } else {
      setTotalPriceRequired("");
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }

    function cleanFormData(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === undefined ? null : v])
  );
}

    const formData = {
      vehicle_image,
      vehicle_make: vehicle_Make,
      vehicle_model: vehicle_Model,
      vehicle_year: vehicle_Year,
      vehicle_type: vehicle_Type,
      vehicle_mileage: vehicle_Mileage,
      vehicle_tag: vehicle_Tag,
      vehicle_serial: vehicle_Serial,
      vehicle_color: vehicle_Color,
      vehicle_total_price: vehicle_Total_Price,
    };

    // Pass the form data to the service
    const newAdmin = vehicleService.createVehicle(formData);
    newAdmin
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
                        name="vehicle_image"
                        value={vehicle_image}
                        onChange={(event) => setImage(event.target.value)}
                        placeholder="vehicle Image"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_Year"
                        value={vehicle_Year}
                        onChange={(event) => setYear(event.target.value)}
                        placeholder="vehicle Year"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_Make"
                        value={vehicle_Make}
                        onChange={(event) => setMake(event.target.value)}
                        placeholder="vehicle Make"
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_Model"
                        value={vehicle_Model}
                        onChange={(event) => setModel(event.target.value)}
                        placeholder="vehicle Model"
                        required
                      />
                      {modelRequired && (
                        <div className="validation-error" role="alert">
                          {modelRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_Type"
                        value={vehicle_Type}
                        onChange={(event) => setType(event.target.value)}
                        placeholder="vehicle Type"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_Mileage"
                        value={vehicle_Mileage}
                        onChange={(event) => setMileage(event.target.value)}
                        placeholder="vehicle Mileage"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_Tag"
                        value={vehicle_Tag}
                        onChange={(event) => setTag(event.target.value)}
                        placeholder="vehicle Tag"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_Serial"
                        value={vehicle_Serial}
                        onChange={(event) => setSerial(event.target.value)}
                        placeholder="vehicle Serial"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="color"
                        name="vehicle_Color"
                        value={vehicle_Color}
                        onChange={(event) => setColor(event.target.value)}
                        placeholder="vehicle Color"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="number"
                        name="vehicle_Total_price"
                        value={vehicle_Total_Price}
                        onChange={(event) => setTotalPrice(event.target.value)}
                        placeholder="vehicle Price in Birr"
                        required
                      />
                      {totalPriceRequired && (
                        <div className="validation-error" role="alert">
                          {totalPriceRequired}
                        </div>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add vehicle</span>
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

export default AddVehicleForm;
