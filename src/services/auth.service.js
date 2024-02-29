import axios from "axios";

class AuthService {
  constructor() {
    // In the constructor of the AuthService class, we create the property this.api, which holds a new axios instance with a custom configuration.
    // This custom configuration sets the base URL for all API requests to either the SERVER_URL environment variable
    // or http://localhost:5005 if the environment variable is not set.
    this.api = axios.create({
      // We set our API's base URL so that all requests use the same base URL
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });
    // Automatically set JWT token in the headers for every request
    // This line sets up an interceptor for outgoing requests.
    // Whenever a request is made, this function will be executed before the request is sent.
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

    login = (requestBody) => {
      return this.api.post("/auth/login", requestBody);
    };

    signup = (requestBody) => {
      return this.api.post("/auth/signup", requestBody);
    };

    verify = () => {
      return this.api.get("/auth/verify");
    };
}
// Create a new instance object
const authService = new AuthService();
export default authService;
