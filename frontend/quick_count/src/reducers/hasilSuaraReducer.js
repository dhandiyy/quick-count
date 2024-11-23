import {createSlice} from "@reduxjs/toolkit";

const hasilSuaraSlice = createSlice({
	name:"hasilSuara",
	initialState: [],
	reducers : {
		createHasilSuara(state, action) {
			const content = action.payload
			state.push(content)
		},
		setHasilSuara(state, action) {
			return action.payload
		},
		updateHasilSuara(state, action) {
			return state.map(hs => {
				hs.id === action.payload.id ? action.payload : hs
			})
		},
		deleteHasilSuara(state, action) {
			return state.filter(hs => hs.id !== action.payload.id)
		}

	}
})

export const {
	createHasilSuara,
	setHasilSuara,
	updateHasilSuara,
	deleteHasilSuara

} = hasilSuaraSlice.actions

export default hasilSuaraSlice.reducer