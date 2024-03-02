import { useState } from "react";
import coursesService from "../services/courses.service";

function AddCourse(props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, image, category, level, price };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    coursesService
      .createCourse(requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setImage("");
        setCategory("");
        setLevel("");
        setPrice(null);
        props.refreshCourses();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProject">
      <h3>Add a Course</h3>

      <form onSubmit={handleSubmit}>
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
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>
          Category:
          <select name="category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">-</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="grammar">Grammar</option>
            <option value="conversation">Conversation</option>
            <option value="pronunciation">Pronunciation</option>
            <option value="culture">Culture</option>
            <option value="listening">Listening</option>
            <option value="writing">Writing</option>
          </select>
        </label>
        <label>
          Category:
          <select name="level" onChange={(e) => setCategory(e.target.value)}>
            <option value="">-</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
        </label>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCourse;
