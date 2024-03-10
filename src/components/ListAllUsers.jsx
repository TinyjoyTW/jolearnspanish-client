import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import usersService from "../services/users.service";
import styles from "./ListAllUsers.module.css";

function ListAllUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const ref = useRef();

  const listAllUsers = () => {
    ref.current.showModal();

    usersService
      .getAllNonAdminUsers()
      .then((response) => setUsers(response.data))
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  const handleClose = () => {
    ref.current.close();
  };

  console.log(users);

  return (
    <>
      <Button onClick={listAllUsers}>List of all users</Button>

      <dialog ref={ref} className={styles["list-all-users-dialog"]}>
        <ol>
          {users.map((user) => (
            <li key={user._id} className={styles["user-emails"]}>
              <Link to={`/users/${user._id}`}>{user.email}</Link>
            </li>
          ))}
        </ol>
        <Button variant="outline-secondary" onClick={handleClose}>
          Back
        </Button>
      </dialog>
    </>
  );
}

export default ListAllUsers;
