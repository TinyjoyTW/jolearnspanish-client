import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import coursesService from "../services/courses.service";

function EditCoursePage(props) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState(null);

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
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

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    coursesService.updateCourse(courseId, requestBody).then((response) => {
      navigate(`/courses/${courseId}`);
    });
  };

  const deleteProject = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    coursesService
      .deleteCourse(courseId)
      .then(() => navigate("/courses"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Course</h3>

      <form onSubmit={handleFormSubmit}>
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

        <button type="submit">Save</button>
      </form>

      <button onClick={deleteProject}>Delete Course</button>
    </div>
  );
}

export default EditCoursePage;
