import { IoIosCloseCircle } from "react-icons/io";

export const ReportModal = ({ onCloseReportModal }) => {
	const handleCloseReportModal = () => {
		onCloseReportModal(true);
	};
	return (
		<>
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center backdrop-filter backdrop-blur-sm justify-center `}>
				<div className="relative w-[800px] shadow bg-white border border-gray-300 rounded p-10">
					<div className="flex items-center justify-between">
						<h1 className="text-lg font-bold text-primaryColor">Report Course</h1>
						<IoIosCloseCircle
							onClick={handleCloseReportModal}
							size={22}
							className="text-red-500 cursor-pointer"
						/>
					</div>
					<div className="pt-2">
						<hr />
					</div>
					<p className="text-xs pt-2">
						Report and swiftly address any malicious content by submitting it for
						prompt inspection by administrators.
					</p>
					<div className="pt-5">
						<h1 className="text-sm">Why do you want to report this course?</h1>
					</div>
					<div className="flex flex-col space-y-2 pt-2">
						<label className="flex items-center gap-2 border border-gray-300 h-8 px-4 rounded">
							<input
								type="radio"
								className=" text-gray-500 rounded border border-primaryColor"
							/>
							<p className="text-xs">
								Course module contains sexual or inappropriate contents
							</p>
						</label>
						<label className="flex items-center gap-2 border border-gray-300 h-8 px-4 rounded">
							<input
								type="radio"
								className=" text-gray-500 rounded border border-primaryColor"
							/>
							<p className="text-xs">Course module does not meet quality standards</p>
						</label>
						<label className="flex items-center gap-2 border border-gray-300 h-8 px-4 rounded">
							<input
								type="radio"
								className=" text-gray-500 rounded border border-primaryColor"
							/>
							<p className="text-xs">
								Course module raises concerns about academic integrity.
							</p>
						</label>
						<label className="flex items-center gap-2 border border-gray-300 h-8 px-4 rounded">
							<input
								type="radio"
								className=" text-gray-500 rounded border border-primaryColor"
							/>
							<p className="text-xs">Other issues with the course module</p>
						</label>
					</div>
					<div className="pt-5">
						<h1 className="text-sm">
							Other issues{" "}
							<span className="text-gray-400 text-xs">
								kindy specify so our team can accomodate your report swiftly
							</span>
						</h1>
						<textarea
							name=""
							placeholder="Specify the problem rgarding the course module"
							className="w-full mt-2  p-5 text-xs outline-none border border-gray-500 rounded"></textarea>
					</div>
					<div className="flex justify-end pt-5">
						<button className="text-xs  text-white bg-primaryColor h-10 rounded px-2">submit report</button>
					</div>
				</div>
			</div>
		</>
	);
};
