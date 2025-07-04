import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";

import SearchIcon from "@mui/icons-material/Search";


// Import the getAllVehicle function
import vehicleService from "../../../../services/vehicle.service";
import AdminMenu from "../AdminMenu/AdminMenu";
import { Link } from "react-router-dom";

// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function VehicleList() {
  // Create all the states we need to store the data
  // Create the vehicles state to store the vehicles data
  const [vehicles, setVehicles] = useState([]);
  //   const [admins, setAdmins] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // A state to store deletion error
  const [Error, setError] = useState("");
  //  A state to store success message
  const [Success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  // To get the logged in admin token
  const { admin } = useAuth();
  let token = ""; // To store the token
  if (admin) {
    token = admin.admin_token;
  }

  const fetchVehicles = () => {
    // Call the getAllVehicles function
    const allVehicles = vehicleService.getAllVehicles(token);
    allVehicles
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
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data.data.length !== 0) {
          setVehicles(data.data);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    fetchVehicles();
  }, [token]);

  const handleDeleteVehicle = async (id) => {
    setError("");
    setSuccess("");
    try {
      const response = await vehicleService.deleteVehicle(id, token);
      window.confirm("Are you sure want to delete!");
      const data = await response.json();
      if (data.status === "success") {
        setSuccess("Vehicle deleted successfully!");
        setTimeout(() => {
          setSuccess("");
          // Optionally refresh the Vehicle list here:
          fetchVehicles();
        }, 1500);
      } else {
        setError(
          data.message || "An error occurred while deleting the Vehicle."
        );
        setTimeout(() => setError(""), 2000);
      }
    } catch (err) {
      setError("An error occurred while deleting the Vehicle.");
      setTimeout(() => setError(""), 2000);
      console.log(err);
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    [vehicle.vehicle_model, vehicle.vehicle_tag, vehicle.vehicle_type, vehicle.vehicle_serial]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
                    Here you can see all the vehicle of the company. You can
                    edit or delete any vehicles from this list.
                  </div>
                </div>
                <div className="search-bar admin-bar">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search vehicles by name , model, year, serial, etc."
                  />
                  <SearchIcon />
                </div>
                <div className="admin-alerts-container my-3">
                  {Error && (
                    <div className="alert alert-danger custom-alert">
                      {Error}
                    </div>
                  )}
                  {Success && (
                    <div className="alert alert-success custom-alert">
                      {Success}
                    </div>
                  )}
                </div>
                <div className="vehicle-table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Vehicle Image</th>
                        <th>Vehicle Year</th>
                        <th>Vehicle Make</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Type</th>
                        <th>Vehicle Mileage(KM)</th>
                        <th>Vehicle Tag</th>
                        <th>Vehicle Serial</th>
                        <th>Vehicle Color</th>
                        <th>Vehicle Total Price(Br.)</th>
                        <th>Added Date</th>
                        <th>Edit/Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredVehicles
                        .slice()
                        .sort((a, b) => b.vehicle_id - a.vehicle_id)
                        .map((vehicle, idx) => {
                          // console.log(vehicle);
                          return (
                            <tr key={vehicle.vehicle_id}>
                              <td>{idx + 1}</td>
                              <td>{vehicle.vehicle_image}</td>
                              <td>{vehicle.vehicle_year}</td>
                              <td>{vehicle.vehicle_make}</td>
                              <td>{vehicle.vehicle_model}</td>
                              <td>{vehicle.vehicle_type}</td>
                              <td>{vehicle.vehicle_mileage}</td>
                              <td>{vehicle.vehicle_tag}</td>
                              <td>{vehicle.vehicle_serial}</td>
                              <td>{vehicle.vehicle_color}</td>
                              <td>{vehicle.vehicle_total_price}</td>
                              <td>
                                {format(
                                  new Date(vehicle.vehicle_added_date),
                                  "MM - dd - yyyy "
                                )}
                              </td>
                              <td>
                                <div className="edit-delete-icons d-flex justify-center align-center">
                                  <div className="edit">
                                    <Link
                                      to={`/admin/vehicle/${vehicle.vehicle_iden_id}`}
                                    >
                                      <EditOutlinedIcon /> |
                                    </Link>
                                  </div>
                                  <div
                                    className="delete"
                                    onClick={() =>
                                      handleDeleteVehicle(
                                        vehicle.vehicle_iden_id
                                      )
                                    }
                                  >
                                    <DeleteOutlineOutlinedIcon />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default VehicleList;
