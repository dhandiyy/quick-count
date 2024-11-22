import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Tps from "./pages/Tps.jsx";
import HasilSuara from "./pages/HasilSuara.jsx";
import VotingResult from "./pages/VotingResult.jsx";
import loginService from "./services/login.js"
import {useEffect, useState} from "react";
import HomeSuperAdmin from "./pages/HomeSuperAdmin.jsx";
import {jwtDecode} from "jwt-decode"


import {
	Navigate,
	Route,
	Routes,
	useMatch,
	useNavigate,
	useParams
} from "react-router-dom";

const ProtectedRoute = ({ children, user, redirectTo = '/login' }) => {
	if (!user) {
		return <Navigate to={redirectTo} replace />;
	}
	const nameChildren = children.type.name
	if(user.role ==="SUPER_ADMIN" && (nameChildren === "Tps" || nameChildren === "Hasilsuara")){
		return <Navigate to={redirectTo} replace />;
	}

	return children;
};

const RoleBasedRoute = ({ user, adminComponent: AdminComponent, superAdminComponent: SuperAdminComponent }) => {
	if (user?.role === "ADMIN") {
		return <AdminComponent />;
	}
	return <SuperAdminComponent />;
};

function App() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		const checkTokenValidity = (token) => {
			try {
				const decodedToken = jwtDecode(token);
				console.log(decodedToken)
				const currentTime = Date.now() / 1000;
				return decodedToken.exp > currentTime;
			} catch (error) {
				return false;
			}
		};

		const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);

			if (checkTokenValidity(user.token)) {
				setUser({
					...user,
					token: `Bearer ${user.token}`,
				});
			} else {
				window.localStorage.removeItem('loggedNoteAppUser');
				navigate('/login');
			}
		}

		setLoading(false);
	}, []);

	const handleLogin = async (userObject) => {
		try {
			const response = await loginService.login(userObject);

			if (response.status === 'error') {
				return response;
			}

			const newUser = {
				...response,
				token: `Bearer ${response.token}`,
			};

			window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(response));
			setUser(newUser);
			navigate('/home');
			return response;

		} catch (error) {
			return {
				status: 'error',
				error: error.response?.data?.error || 'Login failed'
			};
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedNoteAppUser');
		setUser(null);
		navigate('/');
	};

	if (loading) {
		return <div>Loading...</div>;
	}


	return (
		<div className="min-h-screen">
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={<VotingResult />} />
				<Route path="/login" element={<Login login={handleLogin} />} />

				{/* Protected Routes */}
				<Route
					path="/home"
					element={
						<ProtectedRoute user={user}>
							<RoleBasedRoute
								user={user}
								adminComponent={Home}
								superAdminComponent={HomeSuperAdmin}
							/>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/tps"
					element={
						<ProtectedRoute user={user}>
							<Tps />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/hasilsuara"
					element={
						<ProtectedRoute user={user}>
							<HasilSuara />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}


export default App
