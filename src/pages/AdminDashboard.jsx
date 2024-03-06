import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import CreateCourseForm from "../components/CreateCourseForm";
import styles from "./AdminDashboard.module.css";

function AdminDashboard() {
  return (
    <>
      <h1 className={styles["admin-dashboard-h1"]}>Admin Dashboard</h1>
      <div className={styles["admin-dashboard-container"]}>
        <div className={styles["dashboard-courses"]}>
          <h3>Courses</h3>
          <p>Amout: </p>
          
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
