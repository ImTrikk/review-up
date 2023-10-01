import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Mainpage } from "./pages/Mainpage";
import { Login, Signup } from "./pages/authentication/AuthenticationPages.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Courses } from "./pages/Dashboard/Courses";
import { MyCourses } from "./pages/Dashboard/MyCourses";
import { Archived } from "./pages/Dashboard/Archived";
import { Profile } from "./pages/Dashboard/Profile";
import { Settings } from "./pages/Dashboard/Settings";
import { CreateCourse } from "./pages/CreateCourse";
import { CourseModule } from "./pages/CourseModule";

function App() {
 return (
  <>
   <Routers>
    <Routes>
     <Route path="/" element={<Mainpage />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/login" element={<Login />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/courses" element={<Courses />} />
     <Route path="/my-courses" element={<MyCourses />} />
     <Route path="/archived" element={<Archived />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/settings" element={<Settings />} />
     <Route path="/create-course" element={<CreateCourse />} />
     <Route path="/course-module" element={<CourseModule />} />
    </Routes>
   </Routers>
  </>
 );
}

export default App;
