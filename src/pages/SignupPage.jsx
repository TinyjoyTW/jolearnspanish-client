import styles from "./SignupPage.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import Popup from "../components/Popup";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const [isShown, setIsShown] = useState(false);
  const handleClose = () => setIsShown(false);
  const handleShow = () => setIsShown(true);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    authService
      .signup(requestBody)
      .then(() => {
        handleShow();
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div className={styles["signup-page-container"]}>
      <Popup
        modalTitle={"Signup successful!"}
        closePopup={handleClose}
        isShown={isShown}
        onClose={redirectToLoginPage}
        bodyText={"Welcome to the club!"}
      />
      <h1>SIGNUP</h1>

      <form onSubmit={handleSignupSubmit} className={styles["signup-form"]}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit" className={styles["form-signup-button"]}>
          Signup
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
