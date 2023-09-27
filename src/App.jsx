import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Mainpage } from "./pages/Mainpage";
import { Login, Signup } from "./pages/authentication/AuthenticationPages.jsx";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Reviewers } from "./pages/Dashboard/Reviewers";
import { MyReviewers } from "./pages/Dashboard/MyReviewers";
import { Archived } from "./pages/Dashboard/Archived";
import { Profile } from "./pages/Dashboard/Profile";
import { Settings } from "./pages/Dashboard/Settings";

function App() {
 return (
  <>
   <Routers>
    <Routes>
     <Route path="/" element={<Mainpage />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/login" element={<Login />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/reviewers" element={<Reviewers />} />
     <Route path="/my-reviewer" element={<MyReviewers />} />
     <Route path="/archived" element={<Archived />} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/settings" element={<Settings />} />
    </Routes>
   </Routers>
  </>
 );
}

export default App;
