// Import from the env 
const api_url = process.env.REACT_APP_API_URL;

// A function to send post request to create a new Admin 
const createAdmin = async (formData) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  };
  const response = await fetch(`${api_url}/api/admin`, requestOptions);
  return response;
}
// A function to send get request to get all Admins
const getAllAdmins = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 
      'x-access-token': token }
  };
  const response = await fetch(`${api_url}/api/admins`, requestOptions);
  return response;
}

// Export all the functions 
const AdminService = {
  createAdmin,
  getAllAdmins
}
export default AdminService; 