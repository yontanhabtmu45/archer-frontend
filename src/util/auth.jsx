// Function to read the data from the user's local storage  
const getAuth = () => {
  const adminStr = localStorage.getItem('admin');
  if (!adminStr) return {};
  try {
    const admin = JSON.parse(adminStr);
    if (admin && admin.admin_token) {
      const decodedToken = decodeTokenPayload(admin.admin_token);
      admin.admin_role = decodedToken.admin_role;
      admin.admin_id = decodedToken.admin_id;
      admin.admin_first_name = decodedToken.admin_first_name;
      return admin;
    }
    return {};
  } catch (err) {
    console.error("Error decoding admin token:", err);
    return {};
  }
};
  
  // Function to decode the payload from the token
  // The purpose of this code is to take a JWT token, extract its payload, decode it from Base64Url encoding, and then convert the decoded payload into a JavaScript object for further use and manipulation
  const decodeTokenPayload = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  
  export default getAuth;