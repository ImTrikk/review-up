import { useNavigate } from "react-router-dom";

export const Heropage = () => {
 const navAuth = useNavigate("/signup");
 const handleNavSignup = () => {
  navAuth("/signup");
  const handleNavLogin = () => {
   navAuth("/login");
  };
 };
 return (
		<>
			<div className="lg:max-w-7xl mx-36 2xl:mx-auto">
				<div className="flex items-center h-screen">
					<div className="flex items-center">
						<div>
							<h1 className="text-primaryColor text-4xl font-extrabold">
								LEARN, PARTICIPATE, SHARE, AND GROW WITH FELLOW STUDENTS
							</h1>
							<p className="pt-3 font-light text-sm text-primaryColor">
								A review app for students who wants to level up their learning
								experience and improve their grades guided with students who went to the
								same course.
							</p>
							<p className="pt-3 font-light text-sm text-primaryColor">
								Share your notes, reviewers for a specific course and make guide
								questionnaires.
							</p>
							<div className="pt-5">
								<button
									onClick={handleNavSignup}
									className="h-10 text-xs px-5 rounded text-white bg-primaryColor">
									Get Started
								</button>
							</div>
						</div>
						<div>
							<img
								src="/static/images/heropage-image.png"
								alt=""
								className="w-[1200px]"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
