import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";
// Import the getAllAdmins function
import adminService from "../../../../services/admin.service";
import AdminMenu from "../AdminMenu/AdminMenu";
import { Link } from "react-router-dom";

// Icons
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

function AdminsList() {
  // Create all the states we need to store the data
  // Create the admins state to store the admins data
  const [admins, setAdmins] = useState([]);
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
    // Call the getAllAdmins function
    const allAdmins = adminService.getAllAdmins(token);
    allAdmins
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

  // Delete an admin
  const handleDelete = async (adminId) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const response = await adminService.deleteAdmin(
        adminId,
        admin.admin_token
      );
      if (response.status === "success") {
        setAdmins((prev) => prev.filter((a) => a.admin_id !== adminId));
      } else {
        alert(response.message || "Failed to delete admin.");
      }
    } catch (err) {
      alert("An error occurred while deleting the admin.");
    }
  };
  // a function for edit
  // const handleEdit = async (id) => {
  //   // Call the getAdmin function from the adminService
  //   const response = await adminService.getAdmin(id, token);
  //   if (response.status === 200) {
  //     // If the response status is 200, then the admin has been retrieved successfully
  //     // Redirect the user to the edit admin page
  //     window.location.href = `/admin/edit-admin/${id}`;
  //   } else {
  //     // If the response status is not 200, then there is an error
  //     setApiError(true);
  //     setApiErrorMessage(response.data.message);
  //   }
  // };

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
              <div className="col-md-9 admin-right-side admin-list">
                <div className="contact-title">
                  <h2>Admins</h2>
                  <div className="text">
                    Here you can see all the admins of the company. You can edit
                    or delete any employee from this list.
                  </div>
                </div>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Added Date</th>
                      <th>Role</th>
                      <th>Edit/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin, idx) => (
                      <tr key={admin.admin_id}>
                        <td>{idx + 1}</td>
                        <td>{admin.admin_first_name}</td>
                        <td>{admin.admin_last_name}</td>
                        <td>{admin.admin_email}</td>
                        <td>{admin.admin_phone}</td>
                        <td>
                          {format(
                            new Date(admin.added_date),
                            "MM - dd - yyyy "
                          )}
                        </td>
                        <td>{admin.company_role_name}</td>
                        <td>
                          <div className="edit-delete-icons d-flex justify-center align-center">
                            <div className="edit">
                              <Link
                                to={`/admin/edit/${admin.admin_id}`}
                                // className="btn btn-primary btn-sm ms-2"
                              >
                                <EditOutlinedIcon />  |
                              </Link>
                            </div>
                            <div className="delete" onClick={() => handleDelete(admin.admin_id)}>
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

export default AdminsList;
