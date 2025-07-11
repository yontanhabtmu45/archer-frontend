// Import from the env
// const api_url = process.env.REACT_APP_API_URL;
const api_url = "https://backend-archer.onrender.com";

// A function to send post request to create a new vehicle
const createVehicle = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};

// A function to send get request to get all vehicle
const getAllVehicles = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", "x-access-token": token },
  };
  const response = await fetch(`${api_url}/api/vehicles`, requestOptions);
  return response;
};

// Get vehicle by ID
const getVehicle = async (id, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/vehicle/${id}`, requestOptions);
  return response;
};

// Update vehicle by ID
const updateVehicle = async (id, vehicleData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(vehicleData),
  };
  return await fetch(`${api_url}/api/vehicle/${id}`, requestOptions);
};

// Delete vehicle by ID
const deleteVehicle = async (id, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  return await fetch(`${api_url}/api/vehicle/${id}`, requestOptions);
};

// Export all the functions
const VehicleService = {
  createVehicle,
  getAllVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
export default VehicleService;
