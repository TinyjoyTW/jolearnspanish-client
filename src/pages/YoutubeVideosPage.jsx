import { useState, useEffect } from "react";
import videosService from "../services/videos.service";
import styles from "./YoutubeVideosPage.module.css";
import { parseYouTubeVideosFromXML } from "../utils/xmlVideoParser";

const YOUTUBE_API =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCZB26wdYoexth38wmYzLkbQ";

function YoutubeVideosPage() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllVideos = () => {
    videosService
      .getAllVideos()
      .then((response) => {
        const videos = parseYouTubeVideosFromXML(response.data)
        setVideos(videos);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
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

  if (loading || !videos) return <div>Loading...</div>;

  return (
    <div>
      <h1>Check out my videos: </h1>
      {/* <div> */}
      <ul className={styles["video-list"]}>
        {videos.map((video) => (
          <li key={video.id}>
            <a href={video.link}>
              <h3>{video.title}</h3>
              <img src={video.thumbnail} className={styles["thumbnails"]} />
            </a>
          </li>
        ))}
      </ul>
    </div>
    // </div>
  );
}

export default YoutubeVideosPage;
