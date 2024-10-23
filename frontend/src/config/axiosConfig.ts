import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: 'https://chatgeniusapi-soo3.onrender.com/api/v1',  // Set the base URL for all requests
  timeout: 100000,  // Set a default timeout (10 seconds)
  headers: {
    'Content-Type': 'application/json',  // Default content type
  },
  withCredentials: true  // Ensure cookies are sent with requests
});

export default axiosInstance;
