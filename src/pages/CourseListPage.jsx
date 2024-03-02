import { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import coursesService from "../services/courses.service";
import styles from "./CourseListContainer.module.css"

function CourseListPage() {
  const [courses, setCourses] = useState([]);

  const getAllCourses = () => {
    // Send the token through the request "Authorization" Headers
    coursesService.getAllCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className={styles["course-list-container"]}>
      {courses.map((course) => (
        <CourseCard key={course._id} {...course} />
      ))}
    </div>
  );
}

export default CourseListPage;
