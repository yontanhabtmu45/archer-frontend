// Import React and the Hooks we need here 
import React, { useState, useEffect, createContext, useContext } from "react";
// Import the Util function we created to handle the reading from the local storage 
import getAuth from '../util/auth';
// Create a context object  
const AuthContext = createContext();
// Create a provider component  
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged };

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInAdmin = getAuth();
    // console.log(loggedInAdmin);
    loggedInAdmin.then((response) => {
      // console.log(response);
      if (response.admin_token) {
        setIsLogged(true);
        // 3 is the admin_role for admin
        if (response.admin_role === 3) {
          setIsAdmin(true);
        }
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
}

