import { BsFillPlusCircleFill } from "react-icons/bs";

export const LinkResourcesModal = () => {
	const dataSample = [
		{
			id: 1,
			link:
				"https://www.figma.com/file/HeBeuTthmI6MdAaOGrQh98/ReviewUP?node-id=184%3A406&mode=dev",
		},
		{
			id: 2,
			link:
				"https://www.figma.com/file_1/HeBeuTthmI6MdAaOGrQh98/ReviewUP?node-id=184%3A406&mode=dev",
		},
		{
			id: 3,
			link:
				"https://www.figma.com/file_2/HeBeuTthmI6MdAaOGrQh98/ReviewUP?node-id=184%3A406&mode=dev",
		},
		{
			id: 4,
			link:
				"https://www.figma.com/file_3/HeBeuTthmI6MdAaOGrQh98/ReviewUP?node-id=184%3A406&mode=dev",
		},
	];

	return (
		<>
			<div className="pt-8">
				<div className="border border-primaryColor shadow rounded p-5">
					<h1 className="text-primaryColor text-xs">Other resources</h1>
					<div>
						<form action="">
							<div className="flex gap-6">
								{/* Button - Add Link  */}
								<div className="pt-5 ">
									<div className="flex flex-wrap gap-2">
										{/* whenever thebutton is pressed, it should render another input field */}
										<button
											className="flex justify-center items-center border p-2 text-[15px] gap-2 bg-primaryColor rounded-[5px] px-4">
											<BsFillPlusCircleFill size={16} style={{ color: "white" }} />
											<span className="text-xs text-white">Add Link</span>
										</button>
									</div>
								</div>
							</div>
							{/* Links Container  */}
							<div className="py-3 flex flex-col gap-4 ">
								{dataSample.map((obj) => (
									<div
										className="flex items-center right-0 max-w-[950px] h-[60px] bg-white rounded border border-red  border-opacity-10 p-2"
										key={obj.id}>
										<p className="w-full flex items-center pl-2 text-gray-400 text-xs ">
											{obj.link}
										</p>
										<a href={obj.link} target="_blank" rel="noopener noreferrer">
											<button className="bg-indigo-500 text-xs h-8 rounded-[5px] text-white px-5 py-1 ">
												Link
											</button>
										</a>
									</div>
								))}
							</div>
							<div className="flex justify-end pt-5">
								<button className="text-xs text-white bg-primaryColor rounded h-8 px-4">
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
