import React from 'react'
import { Table, Button } from "react-bootstrap";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
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
    <div>AdminsList</div>
  )
}

export default AdminsList