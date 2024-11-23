import {createSlice} from "@reduxjs/toolkit";

const desaSlice = createSlice({
	name: "desa",
	initialState: [],
	reducers : {
		setDesa(state, action) {
			return action.payload
		},
	}
})

export const {setDesa} = desaSlice.actions
export default desaSlice.reducer