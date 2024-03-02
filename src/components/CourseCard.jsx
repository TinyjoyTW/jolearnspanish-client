import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./CourseCard.module.css"

function CourseCard({ _id, title, image, category, level, price }) {
  return (
    <Card className={styles["card"]}>
      <Card.Img variant="top" src={image} className={styles["card-images"]} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button variant="primary">See details</Button>
      </Card.Body>
    </Card>
  );
}

export default CourseCard;
