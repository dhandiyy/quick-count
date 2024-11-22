import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";

const future = {
	v7_startTransition: true,
	v7_relativeSplatPath: true,
};

createRoot(document.getElementById('root')).render(
	<Router future={future}>
		<StrictMode>
			<App/>
		</StrictMode>
	</Router>
)
