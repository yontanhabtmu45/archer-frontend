// const api_url = process.env.REACT_APP_API_URL;
const api_url = 'http://localhost:2716';

// A function to send the login request to the server 
const logIn = async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  };
  console.log("About to send request");
  console.log(requestOptions.body);
  const response = await fetch(`${api_url}/api/admin/login`, requestOptions);
  return response;
}

// A function to log out the user
const logOut = () => {
  localStorage.removeItem("admin");
};


// Export the functions 
module.exports = {
  logIn,
  logOut
}
