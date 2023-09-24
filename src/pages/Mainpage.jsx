import { Heropage } from "./Heropage";
import { AboutPage } from "./AboutPage";
import { Navbar } from "../components/Navbar/navbar";

export const Mainpage = () => {
 return (
  <>
   <div>
    <Navbar />
    <Heropage />
    <AboutPage />
   </div>
  </>
 );
}; 
