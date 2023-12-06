import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, description, user }) => {
	return (
		<div className="bg-primaryColor w-full h-[140px] relative">
			<div>
				<img
					src="/static/images/header.png"
					alt=""
					className="absolute w-full h-full"
				/>
				<div className="ml-[80px] lg:ml-[240px] h-full grid items-end absolute z-10">
					<div className="pb-10">
						{user && <p className="text-xs text-white">Hello, {user}</p>}
						<h1 className="text-white text-3xl font-bold">{title}</h1>
						<p className="text-white text-sm">{description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

Header.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	user: PropTypes.string,
};

export default Header;
