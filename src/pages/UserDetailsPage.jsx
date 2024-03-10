import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserDetailsPage.module.css";
import usersService from "../services/users.service";

function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams();

  const getOneUser = () =>
    usersService
      .getOneUser(userId)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });

  useEffect(() => {
    getOneUser();
  }, []);

  return (
    <div>
      <ul className={styles["user-details-list"]}>
      <h3>User: {user?.email}</h3>
        <h4 className={styles["courses-enrolled-h4"]}>Courses enrolled:</h4>
        {user?.coursesEnrolled.map((course) => (
          <li key={course._id} className={styles["courses-enrolled-list"]}>
            {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetailsPage;
