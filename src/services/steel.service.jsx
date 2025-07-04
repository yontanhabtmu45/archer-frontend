// Import from the env
// const api_url = process.env.REACT_APP_API_URL;
const api_url = "https://backend-archer.onrender.com";

// A function to send post request to create a new steel
const createSteel = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/steel`, requestOptions);
  return response;
};

// A function to send get request to get all steel
const getAllSteels = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(`${api_url}/api/steels`, requestOptions);
  return response;
};

// a function to send get request to get a steel by id
const getSteelById = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(`${api_url}/api/steel/${id}`, requestOptions);
  return response;
};

// a function to send put request to update a steel
const updateSteel = async (id, formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", "x-access-token": token },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/steel/${id}`, requestOptions);
  return response;
};

// a function to send delete request to delete a steel
// steel.service.jsx
const deleteSteel = async (token, id) => {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  return await fetch(`${api_url}/api/steel/${id}`, requestOptions);
};

// Export all the functions
const steelService = {
  // checkIfSteelExist,
  createSteel,
  getAllSteels,
  getSteelById,
  updateSteel,
  deleteSteel,
};
export default steelService;
