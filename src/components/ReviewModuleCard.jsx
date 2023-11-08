import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";
import { buildUrl } from "../utils/buildUrl";

export const ReviewModuleCard = () => {
	const [courseInfo, setCourseInfo] = useState([]);

	const getCourseInfo = async () => {
		await fetch(buildUrl("/"), {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		}).then((res) => {
			if (res.ok) {
				return res.json().then((data) => {
					console.log(data);
					setCourseInfo(data);
				});
			} else {
				return res.json().then((data) => {
					console.log(data);
				});
			}
		});
	};

	useEffect(() => {
		getCourseInfo();
	}, []);

	return (
		<>
			<div className="border border-gray-200 w-[300px] rounded h-[300px] shadow-lg">
				<div className="p-3">
					<div className="bg-primaryColor rounded h-[140px]"></div>
					<div className="pt-2">
						<h1 className="font-black text-xl text-primaryColor">IT 109</h1>
						<p className="text-sm font-medium text-gray-600">
							Web Systems and Integration
						</p>
						<p className="text-xs text-gray-600">By: Patrick James Dionen</p>
					</div>
					<div className="flex items-center justify-between mt-8">
						<div className="text-primaryColor text-xs flex items-center gap-2">
							Rating:
							<StarRating />
						</div>
						<Link to="/course-module">
							<button className="bg-primaryColor text-xs text-white rounded h-7 px-2 ">
								ReviewUP
							</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
