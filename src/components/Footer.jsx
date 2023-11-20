import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<div id="footer">
			<div className="w-full z-20 bottom-0 bg-violet-200 bg-opacity-50 py-10">
				<div className="flex flex-col gap-6 pt-10 pb-5 lg:max-w-7xl mx-36 2xl:mx-auto h-auto">
					<div className="flex flex-col-reverse md:flex-row justify-center items-center">
						<form className="flex flex-col justify-center gap-3 p-5 w-[323px] md:w-[383px] bg-white rounded-md border-gray-200 z-10 md:z-0">
							<input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
								className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
							/>
							<input
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Subject"
								className="border border-gray-200 text-xs font-light h-10 px-2 rounded outline-primaryColor"
							/>
							<textarea
								name=""
								id=""
								cols="30"
								rows="10"
								placeholder="Your message here"
								className="border border-gray-200 text-xs font-light p-2 rounded outline-primaryColor"
							/>
							<button
								type="submit"
								className="bg-primaryColor text-white font-bold h-10 w-full rounded">
								Send
							</button>
						</form>
						<img
							src="/static/images/send-email.png"
							alt=""
							className="w-[360px] absolute z-0 opacity-90"
						/>
						<div className="w-[262px] sm:w-[362px] lg:w-1/2 ml-0 md:ml-10 z-20 pb-10 md:pb-0">
							<h1 className="text-4xl font-extrabold text-white relative z-10">
								Get in touch with team ReviewUP &#129125;
							</h1>
							<p className="text-white text-sm md:text-base font-light pt-5 relative z-10">
								We are students who wants to aim for high grades and at the same time,
								help students struggling with their studies. We don’t want students to
								get left behind in their studies.
							</p>
						</div>
					</div>
					<hr />
					<div className="flex items-center justify-between mt-auto">
						<div className="flex text-white items-center gap-10">© 2023 ReviewUP</div>
						<div className="w-[30px]">
							<Link to="/">
								<img src="/static/images/mainlogo.png" alt="" className="w-[200px]" />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
