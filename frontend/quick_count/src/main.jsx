import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux'
import store from './utils/store.js'
import future from "./utils/future.js";

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<Router future={future}>
			<StrictMode>
				<App/>
			</StrictMode>
		</Router>
	</Provider>
)
