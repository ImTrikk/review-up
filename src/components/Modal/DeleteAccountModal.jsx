//icons
import { IoIosCloseCircle } from "react-icons/io";
import { buildUrl } from "../../utils/buildUrl";
import { useNavigate } from "react-router-dom";

// toaster
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export const DeleteAccountModal = ({ onChangeDeleteModal }) => {
	// getting the user_id
	let user_id = localStorage.getItem("user_id");

	// navigator
	const nav = useNavigate();

	// /for closing delete modaln
	const handleCloseDeleteModal = () => {
		onChangeDeleteModal(true);
	};

	// handle delete account
	const handleDeleteMyAccount = async () => {
		try {
			let response = await fetch(buildUrl(`/auth/delete-account/${user_id}`), {
				method: "DELETE",
			});
			if (response.ok) {
				localStorage.clear();
				console.log("Account deleted");
				toast.info('Account deleted, navigating to home page...')
				setTimeout(() => {
					nav("/");
				}, 5000);
			} else {
				console.log("There was a problem deleteng your account");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<ToastContainer autoClose={2000} />
			<div
				className={`fixed z-40 top-0 left-0 w-full h-screen flex items-center backdrop-filter backdrop-blur-sm justify-center `}>
				<div className="relative w-[800px] h-[500px] shadow bg-white border border-gray-300 rounded p-10">
					<div className="flex justify-between">
						<h1 className="text-2xl font-bold text-red-500">Delete Account</h1>
						<IoIosCloseCircle
							onClick={handleCloseDeleteModal}
							size={22}
							className="text-red-500 cursor-pointer"
						/>
					</div>
					<h1 className="text-sm text-gray-500">
						Are you sure you want to delete your account?
					</h1>
					<div className="absolute bottom-5 right-5">
						<button
							onClick={handleDeleteMyAccount}
							className="bg-red-500 text-white px-2 rounded h-10 text-xs">
							Delete my account
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
