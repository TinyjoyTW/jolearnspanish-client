import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddCourse from "../components/AddCourse";
import coursesService from "../services/courses.service";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./CourseDetailsPage.module.css"

function CourseDetailsPage(props) {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  const getCourse = () =>coursesService
    .getCourse(courseId)
    .then((response) => {
      const oneCourse = response.data;
      setCourse(oneCourse);
    })
    .catch((error) => console.log(error));

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <Card className={styles["card"]}>
      {course && (
        <>
          <Card.Img
            variant="top"
            src={course.image}
            className={styles["card-image"]}
          />
          <Card.Body className={styles["card-body"]}>
            <h1>Title: {course.title}</h1>
            <h3>Category: {course.category}</h3>
            <h3>Price: {course.price}€</h3>
            <Button variant="primary" className={styles["enroll-button"]}>Enroll</Button>
            <Link to="/courses">
              <Button variant="primary">Back to courses</Button>
            </Link>
          </Card.Body>
        </>
      )}

      {/* <AddTask refreshCourses={getCourse} courseId={courseId} /> */}

      {/* <Link to={`/projects/update/${courseId}`}>
        <button>Update Course</button>
      </Link> */}
    </Card>
  );
}

export default CourseDetailsPage;
