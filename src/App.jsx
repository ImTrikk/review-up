import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Mainpage } from "./pages/Mainpage";
import { Login, Signup } from "./pages/authentication/AuthenticationPages.jsx";
import DashboardContainer from "./pages/Dashboard/DashboardContainer";

function App() {
 return (
  <>
   <Routers>
    <Routes>
     <Route path="/" element={<Mainpage />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/login" element={<Login />} />
     <Route path="/dashboard" element={<DashboardContainer />} />
    </Routes>
   </Routers>
  </>
 );
}

export default App;
