// Import React, the useState and useEffect hooks 
import React, { useState, useEffect } from "react";
// Import the Route and Navigate components  
import { Navigate } from "react-router";
// Import the Util function we created to handle the reading from the local storage 
import getAuth from '../../../util/auth';

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInAdmin = getAuth();
    // console.log(loggedInAdmin);
    if (loggedInAdmin.admin_token) {
      setIsLogged(true);
      if (roles && roles.length > 0 && roles.includes(loggedInAdmin.admin_role)) {
        setIsAuthorized(true);
      }
    }
    setIsChecked(true);
  }, [roles]);
  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateAuthRoute;