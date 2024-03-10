import axios from "axios";

class ReviewsService {
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
  getSumOfReviews = () => {
    return this.api.get("/api/sum-of-reviews");
  };
}

const reviewsService = new ReviewsService();
export default reviewsService;
