import axios from "axios";

class CoursesService {
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

  createCourse = (requestBody) => {
    return this.api.post("/api/courses", requestBody);
  };

  getAllCourses = () => {
    return this.api.get("/api/courses");
  };

  getCourse = (id) => {
    return this.api(`/api/courses/${id}`);
  };

  updateCourse = (id, requestBody) => {
    return this.api.put(`/api/courses/${id}`, requestBody);
  };
  deleteCourse = (id) => {
    return this.api.delete(`/api/courses/${id}`);
  };
  enrollCourse = (id) => {
    return this.api.post(`/api/courses/${id}/enroll`);
  };

  getSumOfCourses = () => {
    return this.api.get(`/api/sum-of-courses`);
  };
}
const coursesService = new CoursesService();
export default coursesService;
