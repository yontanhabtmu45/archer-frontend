import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";
// Import the getAllSteel function
import steelService from "../../../../services/steel.service";
import { Link } from "react-router-dom";
import AdminMenu from "../AdminMenu/AdminMenu";

// Icons
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

function SteelList() {
  // Create all the states we need to store the data
  // Create the steels state to store the steels data
  const [steels, setSteels] = useState([]);
  //   const [admins, setAdmins] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // A state to store deletion error
  const [Error, setError] = useState("");
  //  A state to store success message
  const [Success, setSuccess] = useState("");
  // To get the logged in admin token
  const { admin } = useAuth();
  let token = ""; // To store the token
  if (admin) {
    token = admin.admin_token;
  }

  const fetchSteels = () => {
    // if (!token) return;
    //  function to get all vehicles
    const allSteel = steelService.getAllSteels(token);
    allSteel
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
          setSteels(data.data);
        }
      })
      .catch((err) => {
        setApiError(true);
        setApiErrorMessage("An error occurred while fetching steel data.");
        console.log(err);
      });
  };
  useEffect(() => {
    fetchSteels();
  }, [token]);

  // Delete an steel
  const handleDeleteSteel = async (id) => {
    // if (!id) {
    //   setError("Invalid steel ID.");
    //   return;
    // }
    setError("");
    setSuccess("");
    try {
      const response = await steelService.deleteSteel(token, id);
      window.confirm("Are you sure want to delete!");
      const data = await response.json();
      if (data.status === "success") {
        setSuccess("Steel deleted successfully!");
        setTimeout(() => {
          setSuccess("");
          // Optionally refresh the Steel list here:
          fetchSteels();
        }, 1500);
      } else {
        setError(data.message || "An error occurred while deleting the Steel.");
        setTimeout(() => setError(""), 2000);
      }
    } catch (err) {
      setError("An error occurred while deleting the Steel.");
      setTimeout(() => setError(""), 2000);
      console.log(err);
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
                  <h2>Steels</h2>
                  <div className="text">
                    Here you can see all the steel of the company. You can edit
                    or delete any steels from this list.
                  </div>
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
                        <th>steel Image</th>
                        <th>steel Type</th>
                        <th>steel Price / Ton</th>
                        <th>steel Total Price</th>
                        <th>Added Date</th>
                        <th>Edit/Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {steels.map((steel, idx) => (
                        <tr key={steel.steel_id}>
                          <td>{idx + 1}</td>
                          <td>{steel.steel_image}</td>
                          <td>{steel.steel_type}</td>
                          <td>{steel.steel_price_per_ton}</td>
                          <td>{steel.steel_total_price}</td>
                          <td>
                            {steel.steel_added_date
                              ? format(
                                  new Date(steel.steel_added_date),
                                  "MM - dd - yyyy"
                                )
                              : "N/A"}
                          </td>
                          <td>
                            <div className="edit-delete-icons d-flex justify-center align-center">
                              <div className="edit">
                                <Link
                                  to={`/admin/steel/${steel.steel_iden_id}`}
                                >
                                  <EditOutlinedIcon /> |
                                </Link>
                              </div>
                              <div
                                className="delete"
                                onClick={() =>
                                  handleDeleteSteel(steel.steel_iden_id)
                                }
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
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default SteelList;
