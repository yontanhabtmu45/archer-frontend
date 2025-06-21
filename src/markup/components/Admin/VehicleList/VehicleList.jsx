import React, { useEffect, useState } from 'react'
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";
// Import the getAllVehicle function
import vehicleService from "../../../../services/vehicle.service";

function VehicleList() {

      // Create all the states we need to store the data
      // Create the vehicles state to store the vehicles data
      const [vehicles, setVehicles] = useState([]);
    //   const [admins, setAdmins] = useState([]);
      // A state to serve as a flag to show the error message
      const [apiError, setApiError] = useState(false);
      // A state to store the error message
      const [apiErrorMessage, setApiErrorMessage] = useState(null);
      // To get the logged in admin token
      const { admin } = useAuth();
      let token = null; // To store the token
      if (admin) {
        token = admin.admin_token;
      }

      useEffect(() =>{
        //  function to get all admins
        const allVehicle = vehicleService.getAllVehicle(token);
        allVehicle
        .then((res) => {
            if (!res.ok) {
              console.log(res.status);
              setApiError(true);
              if (res.status === 401) {
                setApiErrorMessage("Please login again");
              } else if (res.status === 403) {
                setApiErrorMessage("You are not authorized to view this page");
              } else {
                setApiErrorMessage("Please try again later");
              }
            }
            return res.json();
          })
          .then((data) => {
            if (data.data.length !== 0) {
              setAdmins(data.data);
            }
          })
          .catch((err) => {
            // console.log(err);
          });
      }, [])



  return (
    <>
          {apiError ? (
            <section className="contact-section">
              <div className="auto-container">
                <div className="contact-title">
                  <h2>{apiErrorMessage}</h2>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="contact-section">
                <div className="auto-container">
                  <div className="contact-title">
                    <h2>Vehicles</h2>
                    <div className="text">
                      Here you can see all the vehicle of the company. You can
                      edit or delete any vehicles from this list.
                    </div>
                  </div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Vehicle Image</th>
                        <th>Vehicle Year</th>
                        <th>Vehicle Make</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Mileage</th>
                        <th>Vehicle Tag</th>
                        <th>Vehicle Serial</th>
                        <th>Vehicle Color</th>
                        <th>Vehicle Total Price</th>
                        <th>Added Date</th>
                        <th>Edit/Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehicles.map((vehicle) => (
                        <tr key={vehicle.vehicle_id}>
                          <td>{vehicle.active_vehicle ? "Yes" : "No"}</td>
                          <td>{vehicle.vehicle_image}</td>
                          <td>{vehicle.vehicle_year}</td>
                          <td>{vehicle.vehicle_make}</td>
                          <td>{vehicle.vehicle_model}</td>
                          <td>{vehicle.vehicle_type}</td>
                          <td>{vehicle.vehicle_serial}</td>
                          <td>{vehicle.vehicle_color}</td>
                          <td>{vehicle.vehicle_total_price}</td>
                          <td>
                            {format(
                              new Date(vehicle.added_date),
                              "MM - dd - yyyy | kk:mm"
                            )}
                          </td>
                          <td>
                            <div className="edit-delete-icons">edit | delete</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </section>
            </>
          )}
        </>
  )
}

export default VehicleList