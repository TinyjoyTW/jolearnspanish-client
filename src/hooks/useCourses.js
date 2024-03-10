import { useState, useEffect } from "react";
import coursesService from "../services/courses.service";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const getAllCourses = () => {
    coursesService
      .getAllCourses()
      .then((response) => setCourses(response.data))
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return { courses, error };
};
