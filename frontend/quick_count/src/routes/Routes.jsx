import {createBrowserRouter} from "react-router-dom";
import VotingResult from "../pages/VotingResult.jsx";
import DistrictVotingResult from "../pages/DistrictVotingResult.jsx";
import App from "../App.jsx";
import VillageVotingResult from "../pages/VillageVotingResult.jsx";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <VotingResult />
            },
            {
                path: "detail",
                element: <DistrictVotingResult />,
            },
            {
                path: "detail/:id",
                element: <VillageVotingResult />,
            }
        ]
    }
])

export default routes