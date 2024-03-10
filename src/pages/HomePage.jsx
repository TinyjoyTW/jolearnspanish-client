import Carousel from "react-bootstrap/Carousel";
import { useCourses } from "../hooks/useCourses";
import styles from "./HomePage.module.css";

function HomePage() {
  const { courses, error } = useCourses();

  if (error) {
    return <h3>Error: {error}</h3>;
  }

  console.log(courses);

  return (
    <div className={styles["homepage-main-container"]}>
      <h1>Welcome to JoLearnSpanish</h1>
      <Carousel>
        {courses.map((course) => (
          <Carousel.Item
            key={course._id}
            className={styles["carousel-container"]}
          >
            <img
              src={course.image}
              alt={`course image ${course.title}`}
              className={styles["carousel-images"]}
            />
            <Carousel.Caption>
              <h2 className={styles["carousel-captions"]}>{course.title}</h2>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
export default HomePage;
