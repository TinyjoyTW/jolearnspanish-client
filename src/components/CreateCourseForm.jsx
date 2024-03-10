import { useRef, useState } from "react";
import coursesService from "../services/courses.service";
import Button from "react-bootstrap/Button";
import styles from "./CreateCourseForm.module.css";

const CreateCourseForm = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [isSuccess, setIsSucess] = useState(false);
  const ref = useRef();

  const handleClose = () => {
    ref.current.close();
    setTitle("");
    setImage("");
    setCategory("");
    setLevel("");
    setPrice("");
    setError(null);
    setIsSucess(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, image, category, level, price };

    coursesService
      .createCourse(requestBody)
      .then((response) => {
        setTitle("");
        setImage("");
        setCategory("");
        setLevel("");
        setPrice("");
        setError(null);
        setIsSucess(true);
        setTimeout(() => {
          handleClose();
        }, 3000);
      })
      .catch((error) => setError(error));
  };

  const getVariant = () => {
    if (error) {
      return "outline-danger";
    }

    if (isSuccess) {
      return "outline-success";
    }
  };

  return (
    <>
      <Button onClick={() => ref.current.showModal()}>Create a course</Button>

      <dialog ref={ref} className={styles["form-dialog"]}>
        <form
          onSubmit={handleFormSubmit}
          className={styles["create-course-form"]}
        >
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
            placeholder="please provide a URL"
            onChange={(e) => setImage(e.target.value)}
          />

          <label>Category:</label>
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">-</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="grammar">Grammar</option>
            <option value="conversation">Conversation</option>
            <option value="pronunciation">Pronunciation</option>
            <option value="culture">Culture</option>
            <option value="listening">Listening</option>
            <option value="writing">Writing</option>
          </select>

          <label>Level:</label>
          <select
            name="level"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          >
            <option value="">-</option>
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
            value={price}
            min={0}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className={styles["buttons-container"]}>
            <Button variant={getVariant()} type="submit">
              Save
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
              Back
            </Button>
          </div>
        </form>

        {isSuccess && <h2 className={styles["success"]}>Course successfully created</h2>}

        {error?.response.data.message}
      </dialog>
    </>
  );
};

export default CreateCourseForm;
