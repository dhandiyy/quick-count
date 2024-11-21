import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Tps from "./pages/Tps.jsx";
import HasilSuara from "./pages/HasilSuara.jsx";
import VotingResult from "./pages/VotingResult.jsx";
import loginService from "./services/login.js"
import {useState} from "react";

function App() {
	const [user, setUser] = useState(null)

	const handleLogin = async (userObject) => {
		try {
			const user = await loginService.login(userObject);

			if (user.status === 'error') {
				return user;
			}

			window.localStorage.setItem(
				'loggedNoteAppUser', JSON.stringify(user)
			)
			const newUser = {
				...user,
				token: `Bearer ${user.token}`,
			}
			setUser(newUser)

		} catch (error) {
			return {
				status: 'error',
				error: error.response?.data?.error || 'Login failed'
			};
		}
	}

	return (
		<div>
			<Login login={handleLogin}/>
			{/*<Home/>*/}
			{/*<Tps/>*/}
			{/*<HasilSuara/>*/}
			{/*<VotingResult/>*/}
		</div>

	)
}

export default App
