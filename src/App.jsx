import "./App.css";
import { BrowserRouter as Routers, Routes, Route } from "react-router-dom";
import { Mainpage } from "./pages/Mainpage";
import { Login } from "./pages/authentication/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import { Courses } from "./pages/Dashboard/Courses";
import { MyCourses } from "./pages/Dashboard/MyCourses";
import { Profile } from "./pages/Dashboard/Profile";
import { CreateCourse } from "./pages/CreateCourse";
import { CourseModule } from "./pages/CourseModule";
import { CodeVerification } from "./pages/authentication/CodeVerification";
import { Signup } from "./pages/authentication/Signup";
import { ProtectedRoutes } from "./utils/ProtectedRoute";
import { SavedCourses } from "./pages/Dashboard/SavedCourses";
import { PasswordReset } from "./pages/authentication/PasswordReset";
import GlobalLayout from "./components/GlobalLayout";
import { MyCourseModule } from "./pages/MyCourseModule";
import { SavedCourseModule } from "./pages/SavedCourseModule";
import { QuizPage } from "./pages/QuizPage";

function App() {
	return (
		<>
			<Routers>
				<Routes>
					<Route path="/" element={<Mainpage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-pass" element={<PasswordReset />} />
					<Route path="/verify" element={<CodeVerification />} />
					
					<Route element={<ProtectedRoutes />}>
						<Route
							path="/dashboard"
							element={
								<GlobalLayout>
									<Dashboard />
								</GlobalLayout>
							}
						/>
						<Route
							path="/courses"
							element={
								<GlobalLayout>
									<Courses />
								</GlobalLayout>
							}
						/>
						<Route
							path="my-courses"
							element={
								<GlobalLayout>
									<MyCourses />
								</GlobalLayout>
							}
						/>
						<Route
							path="/profile"
							element={
								<GlobalLayout>
									<Profile />
								</GlobalLayout>
							}
						/>
						<Route
							path="/saved"
							element={
								<GlobalLayout>
									<SavedCourses />
								</GlobalLayout>
							}
						/>
						<Route
							path="/create-course"
							element={
								<GlobalLayout>
									<CreateCourse />
								</GlobalLayout>
							}
						/>
						<Route
							path="/course-module/:id"
							element={
								<GlobalLayout>
									<CourseModule />
								</GlobalLayout>
							}
						/>
						<Route
							path="/my-course-module/:id"
							element={
								<GlobalLayout>
									<MyCourseModule />
								</GlobalLayout>
							}
						/>
						<Route
							path="/saved-course-module/:id"
							element={
								<GlobalLayout>
									<SavedCourseModule />
								</GlobalLayout>
							}
						/>
						<Route
							path="/quiz/:id"
							element={
								<GlobalLayout>
									<QuizPage />
								</GlobalLayout>
							}
						/>
					</Route>
				</Routes>
			</Routers>
		</>
	);
}

export default App;
