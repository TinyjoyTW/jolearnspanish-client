import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import coursesService from "../services/courses.service";
import Button from "react-bootstrap/Button";
import styles from "./EditCoursePage.module.css";

function EditCoursePage() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const updateDialogRef = useRef();
  const deleteDialogRef = useRef();
  
  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    coursesService
      .getCourse(courseId)
      .then((response) => {
        const oneCourse = response.data;
        setTitle(oneCourse.title);
        setImage(oneCourse.image);
        setCategory(oneCourse.category);
        setLevel(oneCourse.level);
        setPrice(oneCourse.price);
      })
      .catch((error) => console.log(error));
  }, [courseId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, image, category, level, price };

    coursesService.updateCourse(courseId, requestBody).then(() => {
      updateDialogRef.current.showModal();
    });
  };

  const deleteCourse = () => {
    coursesService
      .deleteCourse(courseId)
      .then(() => {
        deleteDialogRef.current.showModal();
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  };

  if (error) {
    return (
      <h1 className={styles["error-message"]}>Error, something went wrong.</h1>
    );
  }

  return (
    <div className={styles["edit-course-container"]}>
      <h3>Edit the Course</h3>
      <form onSubmit={handleFormSubmit} className={styles["update-form"]}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Image:</label>
        <input
          type="url"
          name="title"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label>Category:</label>
        <select name="category" onChange={(e) => setCategory(e.target.value)}>
          <option value="">{category}</option>
          <option value="vocabulary">Vocabulary</option>
          <option value="grammar">Grammar</option>
          <option value="conversation">Conversation</option>
          <option value="pronunciation">Pronunciation</option>
          <option value="culture">Culture</option>
          <option value="listening">Listening</option>
          <option value="writing">Writing</option>
        </select>
        <label>Level:</label>
        <select name="level" onChange={(e) => setCategory(e.target.value)}>
          <option value="">{level}</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
        </select>

        <label>Price:</label>
        <input
          type="number"
          name="price"
          min={0}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <div className={styles["save-button"]}>
          <Button type="submit">Save</Button>
        </div>
      </form>
      <div className={styles["buttons-container"]}>
        <Link to={`/courses/${courseId}`}>
          <Button variant="outline-secondary">Back</Button>
        </Link>
        <Button className={styles["delete-button"]} onClick={deleteCourse}>
          Delete course
        </Button>
      </div>

      <dialog ref={updateDialogRef} className={styles["update-dialog"]}>
        <h3>Updated successfully!</h3>
        <Button onClick={() => navigate(`/courses/${courseId}`)}>Ok</Button>
      </dialog>

      <dialog ref={deleteDialogRef} className={styles["delete-dialog"]}>
        <h2>Deleted successfully!</h2>
        <Button onClick={() => navigate(`/courses`)}>Ok</Button>
      </dialog>
    </div>
  );
}

export default EditCoursePage;
