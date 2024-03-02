import styles from "./Navbar.module.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">
        <img src={logo} className={styles["logo"]} />
      </Link>
      <div className={styles["nav-bar-list"]}>
        {isLoggedIn && (
          <>
            <Link to="/projects">
              <button>Projects</button>
            </Link>

            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
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
