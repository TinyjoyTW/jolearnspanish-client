import { Link } from "react-router-dom";
import coursesService from "../services/courses.service";
import { useContext, useEffect,useState } from "react";
import CreateCourseForm from "../components/CreateCourseForm";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  const [sumOfCourses, setSumOfCourses] = useState("");
  const [error, setError] = useState(null);

  const getSumOfCourses = () => {
    coursesService
      .getSumOfCourses()
      .then((response) => setSumOfCourses(response.data))
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    getSumOfCourses();
  }, []);

  return (
    <>
      <h1 className={styles["admin-dashboard-h1"]}>Admin Dashboard</h1>
      <div className={styles["admin-dashboard-container"]}>
        <div className={styles["dashboard-courses"]}>
          <h3>Courses</h3>
          <p>Amount: {sumOfCourses} </p>
          <CreateCourseForm />
        </div>
        <div className={styles["dashboard-users"]}>
          <h3>Users</h3>
          <p>Amout: </p>
          <p>List of all users</p>
        </div>
        <div className={styles["dashboard-reviews"]}>
          <h3>Reviews</h3>
          <p>Amout: </p>
          <p>List of all reviews</p>
        </div>
        <div className={styles["dashboard-transactions"]}>
          <h3>Transactions</h3>
          <p>Amout: </p>
          <p>List of all transactions</p>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
