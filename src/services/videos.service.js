import axios from "axios";

class VideosService {
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
  getAllVideos = () => {
    return this.api.get(
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCZB26wdYoexth38wmYzLkbQ&key=AIzaSyBu5IfG-lzCeyCaK7I2fb5RdNQMXrxPb84%20"
    );
  };
}

const videosService = new VideosService();
export default videosService;
