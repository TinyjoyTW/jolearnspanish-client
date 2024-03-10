import { Link } from "react-router-dom";
import coursesService from "../services/courses.service";
import { useEffect, useState } from "react";
import CreateCourseForm from "../components/CreateCourseForm";
import usersService from "../services/users.service";
import reviewsService from "../services/reviews.service";
import styles from "./AdminDashboard.module.css";
import transactionsService from "../services/transactions.service";
import ListAllUsers from "../components/ListAllUsers";

function AdminDashboard() {
  const [sumOfCourses, setSumOfCourses] = useState("");
  const [sumOfNonAdminUsers, setSumOfNonAdminUsers] = useState("");
  const [sumOfReviews, setSumOfReviews] = useState("");
  const [sumOfTransactions, setSumOfTransactions] = useState("");
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

  const getSumOfNonAdminUsers = () => {
    usersService
      .getSumOfNonAdminUsers()
      .then((response) => setSumOfNonAdminUsers(response.data))
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const getSumOfReviews = () => {
    reviewsService
      .getSumOfReviews()
      .then((response) => setSumOfReviews(response.data))
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const getSumOfTransactions = () => {
    transactionsService
      .getSumOfTransactions()
      .then((response) => setSumOfTransactions(response.data))
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    getSumOfCourses();
    getSumOfNonAdminUsers();
    getSumOfReviews();
    getSumOfTransactions();
  }, []);

  return (
    <>
      <h1 className={styles["admin-dashboard-h1"]}>Admin Dashboard</h1>
      <div className={styles["admin-dashboard-container"]}>
        <div className={styles["dashboard-courses"]}>
          <h3>Courses</h3>
          <p>Total: {sumOfCourses} courses </p>
          <CreateCourseForm />
        </div>
        <div className={styles["dashboard-users"]}>
          <h3>Users</h3>
          <p>Total: {sumOfNonAdminUsers} users</p>
          <ListAllUsers />
        </div>
        <div className={styles["dashboard-reviews"]}>
          <h3>Reviews</h3>
          <p>Total: {sumOfReviews} reviews</p>
          <p>List of all reviews</p>
        </div>
        <div className={styles["dashboard-transactions"]}>
          <h3>Transactions</h3>
          <p>Total: {sumOfTransactions} transactions</p>
          <p>List of all transactions</p>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
