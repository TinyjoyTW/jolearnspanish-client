import axios from "axios";

class UsersService {
  constructor() {
    this.api = axios.create({
      baseURL:
        import.meta.env.SERVER_URL ||
        "https://jolearnspanish-server-dev.adaptable.app/",
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  getAllNonAdminUsers = () => {
    return this.api.get("/api/non-admin-users");
  }

  getSumOfNonAdminUsers = () => {
    return this.api.get("/api/sum-of-non-admin-users");
  };

  getOneUser = (id) => {
    return this.api.get(`/api/users/${id}`);
  }
}

const usersService = new UsersService();
export default usersService;
