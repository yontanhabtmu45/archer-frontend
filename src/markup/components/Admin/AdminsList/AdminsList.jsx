import React, { useEffect, useState } from 'react'
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Context/AuthContext";
// Import the date-fns library
import { format } from "date-fns";
// Import the getAllAdmins function
import adminService from '../../../../services/admin.service';


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
                <h2>Admins</h2>
                <div className="text">
                  Here you can see all the admins of the company. You can
                  edit or delete any employee from this list.
                </div>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Active</th>
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
                  {admins.map((admin) => (
                    <tr key={admin.admin_id}>
                      <td>{admin.active_admin ? "Yes" : "No"}</td>
                      <td>{admin.admin_first_name}</td>
                      <td>{admin.admin_last_name}</td>
                      <td>{admin.admin_email}</td>
                      <td>{admin.admin_phone}</td>
                      <td>
                        {format(
                          new Date(admin.added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{admin.company_role_name}</td>
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

export default AdminsList