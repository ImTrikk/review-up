import { Link } from "react-router-dom";

export const Services = () => {
	return (
		<>
			<div id="services" className="relative z-20 pb-10">
				<div className="lg:max-w-7xl mx-5 md:mx-10 lg:mx-28 2xl:mx-auto pt-10 sm:pt-0">
					<div className="flex flex-col-reverse md:flex-row h-auto items-center">
						<img
							src="static\images\Blob4.png"
							alt=""
							className="hidden md:flex justify-end items-end w-[352px] h-auto absolute z-0 rotate-90 opacity-60 blur-sm"
						/>
						<div className="w-[262px] sm:w-[362px] lg:w-1/2 ml-0 md:ml-10 z-20 pb-10 md:pb-0">
							<h1 className="text-white text-3xl lg:text-5xl font-extrabold">
								Services We Offer
							</h1>
							<p className="pt-3 font-light text-xs sm:text-sm lg:text-md text-white">
								We offer a comprehensive platform where students can learn, participate,
								share, and grow together by utilizing a specialized review app, sharing
								course-specific notes and reviewers, and collaboratively creating guide
								questionnaires, all designed to enhance the learning experience and
								improve grades with the support of fellow students who have excelled in
								the same courses.
							</p>
						</div>
						<img
							src="/static/images/services-image.png"
							alt=""
							className="w-[260px] sm:w-[360px] md:w-1/2"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
