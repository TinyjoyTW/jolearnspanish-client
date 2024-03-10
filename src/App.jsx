import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CourseListPage from "./pages/CourseListPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import EditCoursePage from "./pages/EditCoursePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAdmin from "./components/IsAdmin";
import IsAnon from "./components/IsAnon";
import YoutubeVideosPage from "./pages/YoutubeVideosPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDetailsPage from "./pages/UserDetailsPage";
import styles from "./App.module.css";

function App() {

  return (
    <div className={styles["app"]}>
      <Navbar />

      <div>
        <Routes>
          <Route
            path="/users/:userId"
            element={
              <IsAdmin>
                <UserDetailsPage />
              </IsAdmin>
            }
          />

          <Route path="/" element={<HomePage />} />

          <Route path="/courses" element={<CourseListPage />} />

          <Route path="/courses/:courseId" element={<CourseDetailsPage />} />

          <Route
            path="/courses/update/:courseId"
            element={
              <IsAdmin>
                <EditCoursePage />{" "}
              </IsAdmin>
            }
          />

          <Route path="/videos" element={<YoutubeVideosPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <IsAdmin>
                <AdminDashboard />
              </IsAdmin>
            }
          />

          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
