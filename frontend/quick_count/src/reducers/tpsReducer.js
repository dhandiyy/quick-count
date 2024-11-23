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
		},
		updateTps(state, action) {
			return state.map(tps => {
				tps.id === action.payload.id ? action.payload : tps
			})
		},
		deleteTps(state, action) {
			return state.filter(tps => tps.id !== action.payload.id)
		}
	}
})

export const {
	createTps,
	setTps,
	updateTps,
	deleteTps

} = tpsSlice.actions

export default tpsSlice.reducer