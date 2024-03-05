import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import coursesService from "../services/courses.service";
import styles from "./CourseDetailsPage.module.css";
import { AuthContext } from "../context/auth.context";

function CourseDetailsPage(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  const { courseId } = useParams();

  const getCourse = () =>
    coursesService
      .getCourse(courseId)
      .then((response) => {
        const oneCourse = response.data;
        setCourse(oneCourse);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });

  useEffect(() => {
    getCourse();
  }, []);

  if (error) {
    return (
      <Card bg="danger" className={styles["error-message"]}>
        <h1>Error, the course couldn't be fetched.</h1>
      </Card>
    );
  }

  return (
    course && (
      <Card className={styles["card"]}>
        <Card.Img
          variant="top"
          src={course.image}
          className={styles["card-image"]} alt="course image"
        />
        <Card.Body className={styles["card-body"]}>
          <h1>Title: {course.title}</h1>
          <h4>Category: {course.category}</h4>
          <h4>Level: {course.level}</h4>
          <h4>Price: {course.price}€</h4>
          {!user?.isAdmin && (
            <Button variant="primary" className={styles["enroll-button"]}>
              Enroll
            </Button>
          )}
          <Link to="/courses">
            <Button variant="primary">Back to courses</Button>
          </Link>

          {isLoggedIn && user.isAdmin && (
            <>
              <Link to={`/courses/update/${courseId}`}>
                <Button>Update course</Button>
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
    )
  );
}

export default CourseDetailsPage;
