import { BsFillPlusCircleFill } from "react-icons/bs";

export const QuizModal = () => {
	return (
		<>
			<div className="pt-8">
				<div className="border border-primaryColor shadow rounded p-5">
					<h1 className="text-primaryColor text-xs">
						Practice quiz for this module
					</h1>
					<div>
						<form action="">
							<div className="pt-5">
								<div className="flex flex-wrap gap-2">
									<button className="flex justify-center items-center border p-2 text-[15px] gap-2 bg-primaryColor rounded-[5px]">
										<BsFillPlusCircleFill size={16} style={{ color: "white" }} />
										<span className="text-white">Question</span>
									</button>
								</div>
								{/* Main Container */}
								<div className="bg-primaryColor w-full rounded-[10px] mt-5 shadow-lg p-4 text-white">
									<div>
										<h3 className="font-bold">Steps</h3>
										<div className="py-2">
											<hr className="border-1 border-white"/>
										</div>
										<div className="flex items-center gap-2 mt-2">
											<div className="bg-white rounded-full text-primaryColor inline-block px-[8px] py-[1px] text-sm ">
												1
											</div>
											<p className="text-sm font-medium">Create a question</p>
										</div>
										<div className="flex items-center gap-2 mt-2">
											<div className="bg-white rounded-full text-primaryColor inline-block px-[7px] py-[1px] text-sm ">
												2
											</div>
											<p className="text-sm font-medium">Add answer choices</p>
										</div>
										<div className="flex items-center gap-2 mt-2">
											<div className="bg-white rounded-full text-primaryColor inline-block px-[7px] py-[1px] text-sm ">
												3
											</div>
											<p className="text-sm font-medium">Select correct answer</p>
										</div>
									</div>
								</div>
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
