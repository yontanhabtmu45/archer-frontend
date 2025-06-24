import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";
// Import the getAllVehicle function
import vehicleService from "../../../../services/vehicle.service";
import AdminMenu from "../AdminMenu/AdminMenu";

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
  let token = ""; // To store the token
  if (admin) {
    token = admin.admin_token;
  }

  useEffect(() => {
    if (!token) return;
    //  function to get all admins
    const allVehicle = vehicleService.getAllVehicles(token);
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
  }, []);

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?"))
      return;
    try {
      const response = await vehicleService.deleteVehicle(
        vehicleId,
        admin?.admin_token
      );
      if (response.status === "success") {
        setVehicles((prev) => prev.filter((v) => v.id !== vehicleId));
      } else {
        setApiError(true);
        setApiErrorMessage(response.message || "Failed to delete vehicle.");
      }
    } catch (err) {
      setApiError(true);
      setApiErrorMessage("An error occurred while deleting the vehicle.");
    }
  };

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
          <section className="container-fluid contact-section">
          <div className="row auto-container">

          
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
            <div className="col-md-9 admin-right-side admin-list auto-container">
              <div className="contact-title">
                <h2>Vehicles</h2>
                <div className="text">
                  Here you can see all the vehicle of the company. You can edit
                  or delete any vehicles from this list.
                </div>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
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
                  {vehicles.map((vehicle, idx) => (
                    <tr key={vehicle.vehicle_id}>
                      <td>{idx + 1}</td>
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
                        <div className="edit-delete-icons d-flex justify-center align-center">
                          <div className="edit">
                            <Link to={`/vehicle/edit/${vehicle.id}`}>
                              <EditOutlinedIcon /> |
                            </Link>
                          </div>
                          <div
                            className="delete"
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default VehicleList;
