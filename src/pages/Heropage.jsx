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
		<div id="home">
			<div className="md:mx-10 mx-20 lg:max-w-7xl xl:mx-36 2xl:mx-auto flex justify-center">
				<div className="flex flex-col-reverse md:flex-row items-center md:items-center md:h-screen">
					<div className="w-full md:w-[362px] lg:w-1/2 pt-0 md:pt-[192px] lg:pt-0">
						<h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl  font-extrabold">
							LEARN, PARTICIPATE, SHARE, AND GROW WITH FELLOW STUDENTS
						</h1>
						<p className="pt-3 font-light text-xs sm:text-sm lg:text-md  text-white">
							A review app for students who want to level up their learning experience
							and improve their grades guided by students who took the same course.
						</p>
						<p className="pt-3 font-light text-xs sm:text-sm lg:text-md  text-white">
							Share your notes, reviewers for a specific course, and create guide
							questionnaires.
						</p>
						<div className="pt-5">
							<button
								onClick={handleNavSignup}
								className="items-center md:items-start h-10 text-xs px-5 rounded text-primaryColor bg-white font-semibold">
								Get Started
							</button>
						</div>
					</div>
					<div className="w-full pt-[92px] md:pt-0 md:w-[362px] lg:w-1/2 lg:pl-10">
						<img
							src="/static/images/Digital_learning2.png"
							alt=""
							className="w-full h-auto lg:relative lg:z-10"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
