import CourseCard from "../components/CourseCard";
import styles from "./CourseListPage.module.css";
import { useCourses } from "../hooks/useCourses";

function CourseListPage() {
  const { courses } = useCourses();

  return (
    <div className={styles["course-list-container"]}>
      {courses.map((course) => (
        <CourseCard key={course._id} {...course} />
      ))}
    </div>
  );
}

export default CourseListPage;
