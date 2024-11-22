import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Tps from "./pages/Tps.jsx";
import HasilSuara from "./pages/HasilSuara.jsx";
import DistrictVotingResult from "./pages/DistrictVotingResult.jsx";
import Header from "./components/header/Header.jsx";
import {Outlet} from "react-router-dom";

const App = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	)
}

export default App
