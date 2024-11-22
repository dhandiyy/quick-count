import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Tps from "./pages/Tps.jsx";
import HasilSuara from "./pages/HasilSuara.jsx";
import DistrictVotingResult from "./pages/DistrictVotingResult.jsx";
import VillageVotingResult from "./pages/VillageVotingResult.jsx";
import Header from "./components/header/Header.jsx";

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
import {useDispatch, useSelector} from "react-redux";
import {checkTokenValidity} from "./utils/helper.js";
import {setAdmin} from "./reducers/adminReducer.js";

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
	const dispatch = useDispatch()
	const user = useSelector((state) => state.admin)

	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		const loggedUserJSON = window.sessionStorage.getItem('loggedNoteAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);

			if (checkTokenValidity(user.token)) {
				dispatch(setAdmin({
					...user,
					token: `Bearer ${user.token}`,
				}));
			} else {
				window.sessionStorage.removeItem('loggedNoteAppUser');
				navigate('/login');
			}
		}

		setLoading(false);
	}, []);

	const handleLogin = async (adminObject) => {
		try {
			const response = await loginService.login(adminObject);

			if (response.status === 'error') {
				return response;
			}

			const newAdmin = {
				...response,
				token: `Bearer ${response.token}`,
			};

			window.sessionStorage.setItem('loggedNoteAppUser', JSON.stringify(response));
			dispatch(setAdmin(newAdmin));
			navigate('/home');
			return response;

		} catch (error) {
			return {
				status: 'error',
				error: error.response?.data?.error || 'Login failed'
			};
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}


	return (
		<div className="min-h-screen">
			<Routes>
				{/* Public Routes */}
				<Route path="/" element={
					<>
						<Header/>
						<VotingResult />
					</>
				} />
				<Route path="/login" element={<Login login={handleLogin} />} />
				<Route path="/detail" element={<DistrictVotingResult/>}/>
				<Route path="/detail/:id" element={<VillageVotingResult/>}/>


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
