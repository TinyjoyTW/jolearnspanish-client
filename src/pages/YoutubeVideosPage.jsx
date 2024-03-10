import { useState, useEffect } from "react";
import videosService from "../services/videos.service";
import { parseYouTubeVideosFromXML } from "../utils/xmlVideoParser";
import Card from "react-bootstrap/Card";
import styles from "./YoutubeVideosPage.module.css";

function YoutubeVideosPage() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getAllVideos = () => {
    videosService
      .getAllVideos()
      .then((response) => {
        const videos = parseYouTubeVideosFromXML(response.data);
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
    <div className={styles["video-list-container"]}>
      {videos.map((video) => (
        <Card key={video.id} className={styles["card"]}>
          
            <Card.Title className={styles["title"]}><a href={video.link} target="_blank" rel="noreferrer">{video.title}</a></Card.Title>
            <Card.Img src={video.thumbnail} className={styles["thumbnails"]} alt="video image"/>
        </Card>
      ))}
    </div>
  );
}

export default YoutubeVideosPage;
