import { useState, useEffect } from "react";
import axios from "axios";
// import videosService from "../services/videos.service";
import styles from "./YoutubeVideosPage.module.css";

const YOUTUBE_API =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCZB26wdYoexth38wmYzLkbQ&maxResults=50&key=AIzaSyBoIr5XcqzH6jKSSOzFaAYozPDTpJpiNXs";

function YoutubeVideosPage() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllVideos = () => {
    axios
      .get(YOUTUBE_API)
      .then((response) => setVideos(response.data))
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  if (error) {
    console.log(error);
    return (
      <h1 className={styles["error-message"]}>Error, something went wrong.</h1>
    );
  }

  if (loading || !videos || !videos.items) return <div>Loading...</div>;

  return (
    <div className={styles["video-list-container"]}>
      <h1>Check out my videos: </h1>
      <ul>
        {videos?.items?.map((video) => (
          <div key={video.id}>{video.snippet.title}</div>
        ))}
      </ul>
    </div>
  );
}

export default YoutubeVideosPage;
