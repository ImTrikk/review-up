import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Mainpage } from "./pages/Mainpage";
import { Login, Signup } from "./pages/authentication/AuthenticationPages.jsx";

function App() {
 return (
  <>
   <Routers>
    <Routes>
     <Route path="/" element={<Mainpage />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/login" element={<Login />} />
    </Routes>
   </Routers>
  </>
 );
}

export default App;
