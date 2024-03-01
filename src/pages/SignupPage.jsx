import styles from "./SignupPage.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../services/auth.service";
import PopUpModal from "../components/Modal";
const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <PopUpModal
        modalTitle={"Signup successful!"}
        closePopUpModal={handleClose}
        showState={show}
        redirectToLoginPage={redirectToLoginPage}
        bodyText={"Welcome to the club!"}
      />
      <h1>Sign Up</h1>

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
          Sign Up
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
