import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import {
  FaInstagramSquare,
  FaYoutube,
  FaSpotify,
  FaDonate,
} from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <Link to="/">
        <img src={logo} className={styles["logo"]} alt="logo" />
      </Link>
      <ul>
        {/* <Link to="/contact">
            <li className="contact-us">Contact me</li>
          </Link> */}
        <li>
          <small>© 2024 Jo要學西文ᵀᵂ</small>
        </li>
        <li>
          <Link to="https://www.instagram.com/jolearnlanguages" target="_blank">
            <FaInstagramSquare className={styles["social-media-icons"]} />
          </Link>
        </li>
        <li>
          <Link to="https://www.youtube.com/@jolearnlanguages" target="_blank">
            <FaYoutube className={styles["social-media-icons"]} />
          </Link>
        </li>
        <li>
          <Link
            to="https://podcasters.spotify.com/pod/show/jolearnspanish"
            target="_blank"
          >
            <FaSpotify className={styles["social-media-icons"]} />
          </Link>
        </li>
        <li>
          <Link to="https://www.buymeacoffee.com/joyhuang" target="_blank">
            <FaDonate className={styles["social-media-icons"]} />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
