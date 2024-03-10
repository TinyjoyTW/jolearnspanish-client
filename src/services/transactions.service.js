import axios from "axios";

class TransactionsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
    });
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }
  getSumOfTransactions = () => {
    return this.api.get("/api/sum-of-reviews");
  };
}

const transactionsService = new TransactionsService();
export default transactionsService;
