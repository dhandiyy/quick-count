import {configureStore} from "@reduxjs/toolkit";
import tpsReducer from "../reducers/tpsReducer.js";
import adminReducer from "../reducers/adminReducer.js";

const store = configureStore({
	reducer: {
		tps: tpsReducer,
		admin: adminReducer,
	}
})

export default store;