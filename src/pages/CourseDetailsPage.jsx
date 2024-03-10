import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useParams, useNavigate } from "react-router-dom";
import coursesService from "../services/courses.service";
import styles from "./CourseDetailsPage.module.css";
import { AuthContext } from "../context/auth.context";

function CourseDetailsPage(props) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const isUserEnrolled = course?.studentsEnrolled?.includes(user?._id);
  const navigate = useNavigate();

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

  const enrollCourse = () => {
    if (!isLoggedIn) {
      navigate("/signup")
    } else {
      coursesService
        .enrollCourse(courseId)
        .then((response) => {
          // Instead of re-fetching all courses again, we can just update the course state with the response.data
          // because from the backend we're responding to the frontend with the whole updated course object
          setCourse(response.data);
          alert("Enrolled successfully!");
        })
        .catch((error) => {
          console.log(error);
          setError(error);
        });
    }
  };

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
          className={styles["card-image"]}
          alt="course image"
        />
        <Card.Body className={styles["card-body"]}>
          <h1>Title: {course.title}</h1>
          <h4>Category: {course.category}</h4>
          <h4>Level: {course.level}</h4>
          <h4>Price: {course.price}€</h4>
          {!user?.isAdmin && (
            <Button
              variant="primary"
              className={styles["enroll-button"]}
              onClick={enrollCourse}
              disabled={isUserEnrolled}
            >
              Enroll
            </Button>
          )}
          <Link to="/courses">
            <Button variant="outline-secondary">Back to courses</Button>
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
