import { Link } from "react-router-dom";

export const AboutPage = () => {
	return (
		<>
			<div id="about" className="">
				<div className="lg:max-w-7xl mx-5 md:mx-10 lg:mx-20 2xl:mx-auto">
					<div className="h-auto flex flex-col md:flex-row items-center">
						<div className="md:w-1/2 flex items-center justify-center">
							<img
								src="/static/images/aboutus-image3d.png"
								alt=""
								className="w-[300px] sm:w-[500px] md:w-[600px]"
							/>
						</div>
						<div className="w-[262px] sm:w-[362px] lg:w-1/2 ml-0 md:ml-10 z-20">
							<h1 className="text-white text-3xl lg:text-5xl font-extrabold">
								About us
							</h1>
							<p className="pt-3 font-light text-xs sm:text-sm lg:text-md text-white">
								We are students who aim for high grades and, at the same time, help
								students struggling with their studies. We don’t want students to get
								left behind in their studies.
							</p>
							<div className="pt-8">
								<Link to="/signup">
									<button className="bg-white text-primaryColor px-3 rounded font-semibold text-xs md:text-sm h-10">
										Register now
									</button>
								</Link>
								<img
									src="static\images\Blob1.png"
									alt=""
									className="hidden md:flex justify-end items-end w-[252px] md:w-[352px] h-auto absolute z-0 rotate-90 opacity-60 blur-sm"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
