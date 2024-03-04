import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import EditCoursePage from "./pages/EditCoursePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAdmin from "./components/IsAdmin";
import IsAnon from "./components/IsAnon";
import YoutubeVideosPage from "./pages/YoutubeVideosPage";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/courses" element={<CourseListPage />} />

        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

        <Route
          path="/courses/update/:courseId"
          element={
            <IsAdmin>
              {" "}
              <EditCoursePage />{" "}
            </IsAdmin>
          }
        />

        <Route path="/videos" element={<YoutubeVideosPage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
