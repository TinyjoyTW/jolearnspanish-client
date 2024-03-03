import styles from "./Navbar.module.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <img src={logo} className={styles["logo"]} />
      </Link>
      <div className={styles["nav-bar-list"]}>
        {isLoggedIn && (
          <>
            <Link to="/courses" className={styles["videos"]}>
              Videos
            </Link>
            <Link to="/courses" className={styles["courses"]}>
              Courses
            </Link>
            <button
              onClick={logOutUser}
              className={styles["logout-button"]}
            >
              Logout
            </button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/courses" className={styles["videos"]}>
              Videos
            </Link>
            <Link to="/courses" className={styles["courses"]}>
              Courses
            </Link>
            <Link to="/login" className={styles["login-button"]}>
              Login
            </Link>
            <Link to="/signup" className={styles["signup-button"]}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
