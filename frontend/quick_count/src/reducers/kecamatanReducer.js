import {createSlice} from "@reduxjs/toolkit";

const kecamatanSlice = createSlice({
	name: "kecamatan",
	initialState: [],
	reducers : {
		setKecamatan(state, action) {
			return action.payload
		},
	}
})

export const {setKecamatan} = kecamatanSlice.actions
export default kecamatanSlice.reducer