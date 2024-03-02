import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import coursesService from "../services/courses.service";

function ProjectDetailsPage (props) {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();
  
  
  const getCourse = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    coursesService.getCourse(courseId)
      .then((response) => {
        const oneCourse = response.data;
        setCourse(oneCourse);
      })
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getCourse();
  }, [] );

  
  return (
    <div className="course-details">
      {course && (
        <div>
          <h1>{course.title}</h1>
          <img src={course.image} />
          <p>{course.category}</p>
          <p>{course.level}</p>
          <p>{course.price}</p>
        </div>
      )}

      {/* <AddTask refreshCourses={getCourse} courseId={courseId} /> */}

      {/* {course &&
        course.tasks.map((task) => <TaskCard key={task._id} {...task} />)} */}

      <Link to="/courses">
        <button>Back to courses</button>
      </Link>

      <Link to={`/projects/update/${courseId}`}>
        <button>Update Project</button>
      </Link>
    </div>
  );
}

export default ProjectDetailsPage;