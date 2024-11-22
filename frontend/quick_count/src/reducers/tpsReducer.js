import {createSlice} from "@reduxjs/toolkit";

const tpsSlice = createSlice({
	name: "tps",
	initialState: [],
	reducers: {
		createTps(state, action) {
			const content = action.payload
			state.push(content)
		},
		setTps(state, action) {
			return action.payload
		}
	}
})

export const {
	createTps,
	setTps

} = tpsSlice.actions

export default tpsSlice.reducer