import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./CourseCard.module.css"
import { Link } from "react-router-dom";

function CourseCard({ title, image, _id }) {
  return (
    <Card className={styles["card"]}>
      <Card.Img variant="top" src={image} className={styles["card-images"]} alt="course image"/>
      <Card.Body className={styles["card-body"]}>
        <Card.Title>{title}</Card.Title>
        <Link to={`/courses/${_id}`}>
          <Button variant="primary">See details</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
