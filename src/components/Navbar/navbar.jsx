import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

export const Navbar = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [profileView, setProfileView] = useState(false);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const token = localStorage.getItem("token");
		const first_name = localStorage.getItem("first_name");
		const last_name = localStorage.getItem("last_name");
		if (token) {
			setUsername(first_name + " " + last_name);
			setProfileView(true);
		}
	}, []);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 1024);
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<>
			<div className="fixed w-full z-50">
				<div className="bg-gradient-to-br from-primaryColor to-violet-300 p-2 inset-40">
					<div className="flex items-center justify-between lg:max-w-7xl mx-5 sm:mx-20 2xl:mx-auto">
						<div className="w-[30px]">
							<Link to="/">
								<img
									src="/static/images/whitePNGReviewUp.png"
									alt=""
									className="w-[200px]"
								/>
							</Link>
						</div>
						{isMobile && (
							<button
								className="text-[14px] font-semibold hover:text-slate-400 text-white"
								onClick={toggleMenu}>
								<HiMenu size={30} />
							</button>
						)}

						{isMobile && isMenuOpen && (
							<div className="fixed top-0 right-0 h-full bg-gradient-to-br from-primaryColor to-violet-300 p-5 w-64">
								<button
									className="flex items-center text-[14px] font-semibold hover:text-slate-400 text-white mb-4"
									onClick={closeMenu}>
									<FaTimes size={20} />
									Close
								</button>
								<ul className="flex flex-col gap-5 text-white pb-10">
									<a href="#home">
										<li className="text-sm">Home</li>
									</a>
									<a href="#about">
										<li className="text-sm">About</li>
									</a>
									<a href="#services">
										<li className="text-sm">Services</li>
									</a>
									<a href="#footer">
										<li className="text-sm">Contact</li>
									</a>
								</ul>
								{profileView ? (
									<div>
										<Link to="/dashboard">
											{" "}
											<p className="text-white text-xs">{username}</p>
										</Link>
									</div>
								) : (
									<Link to="/login">
										<button className="bg-white font-semibold text-sm text-primaryColor h-8 px-4 rounded">
											Login
										</button>
									</Link>
								)}
							</div>
						)}
						{!isMobile && (
							<div className="flex items-center gap-16">
								<ul className="flex gap-5 text-white">
									<a href="#home">
										<li className="text-sm">Home</li>
									</a>
									<a href="#about">
										<li className="text-sm">About</li>
									</a>
									<a href="#services">
										<li className="text-sm">Services</li>
									</a>
									<a href="#footer">
										<li className="text-sm">Contact</li>
									</a>
								</ul>
								{profileView ? (
									<div>
										<Link to="/dashboard">
											{" "}
											<p className="text-white text-xs">{username}</p>
										</Link>
									</div>
								) : (
									<Link to="/login">
										<button className="bg-white font-semibold text-sm text-primaryColor h-8 px-4 rounded">
											Login
										</button>
									</Link>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
