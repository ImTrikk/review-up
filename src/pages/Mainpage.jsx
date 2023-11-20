import { Heropage } from "./Heropage";
import { AboutPage } from "./AboutPage";
import { Services } from "./Services";
import { Navbar } from "../components/Navbar/navbar";
import { Footer } from "../components/Footer";

export const Mainpage = () => {
	return (
		<div className="bg-gradient-to-tr from-primaryColor to-violet-300 bg-cover">
			<div>
				<Navbar />
				<Heropage />
				<AboutPage />
				<Services />
				<Footer />
			</div>
		</div>
	);
};
