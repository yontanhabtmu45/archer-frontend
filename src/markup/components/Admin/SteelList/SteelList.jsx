import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";
// Import the getAllSteel function
import steelService from "../../../../services/steel.service";

// Icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


function steelList() {
  // Create all the states we need to store the data
  // Create the steels state to store the steels data
  const [steels, setSteels] = useState([]);
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

  useEffect(() => {
    //  function to get all admins
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

  // Delete an steel 
  const handleDeleteSteel = async (steelId) => {
    if (!window.confirm("Are you sure you want to delete this steel?")) return;
    try {
      const response = await steelService.deleteSteel(steelId);
      if (response.status === "success") {
        setSteels((prevSteels) => prevSteels.filter((steel) => steel.id !== steelId));
      } else {
        setApiError(true);
        setApiErrorMessage(response.message || "Failed to delete steel.");
      }
    } catch (err) {
      setApiError(true);
      setApiErrorMessage("An error occurred while deleting the steel.");
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
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Steels</h2>
                <div className="text">
                  Here you can see all the steel of the company. You can edit or
                  delete any steels from this list.
                </div>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>steel Image</th>
                    <th>steel Type</th>
                    <th>steel Weight</th>
                    <th>steel Price / Ton</th>
                    <th>steel Total Price</th>
                    <th>Added Date</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {steels.map((steel) => (
                    <tr key={steel.steel_id}>
                      <td>{steel.steel_image}</td>
                      <td>{steel.steel_year}</td>
                      <td>{steel.steel_type}</td>
                      <td>{steel.steel_price_per_ton}</td>
                      <td>{steel.steel_total_price}</td>
                      <td>
                        {format(
                          new Date(steel.added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>
                        <div className="edit-delete-icons d-flex justify-center align-center">
                          <div className="edit">
                            <Link
                              to={`/steel/edit/${admin.steel_id}`}
                            >
                              <EditOutlinedIcon /> |
                            </Link>
                          </div>
                          <div
                            className="delete"
                            onClick={() => handleDeleteSteel(admin.steel_id)}
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
          </section>
        </>
      )}
    </>
  );
}

export default steelList;
