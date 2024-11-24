import {configureStore} from "@reduxjs/toolkit";
import tpsReducer from "../reducers/tpsReducer.js";
import adminReducer from "../reducers/adminReducer.js";
import kecamatanReducer from "../reducers/kecamatanReducer.js";
import desaReducer from "../reducers/desaReducer.js";
import hasilSuaraReducer from "../reducers/hasilSuaraReducer.js";
import petugasReducer from "../reducers/petugasReducer.js";

const store = configureStore({
	reducer: {
		tps: tpsReducer,
		admin: adminReducer,
		kecamatan: kecamatanReducer,
		desa: desaReducer,
		hasilSuara: hasilSuaraReducer,
		petugasTps: petugasReducer,
	}
})

export default store;