import {createSlice} from "@reduxjs/toolkit";

const petugasTpsSlice = createSlice({
	name: "petugasTps",
	initialState: [],
	reducers: {
		createPetugasTps(state, action) {
			const content = action.payload
			state.push(content)
		},
		setPetugasTps(state, action) {
			return action.payload
		},
		updatePetugasTps(state, action) {
			return state.map(petugasTps => {
				petugasTps.id === action.payload.id ? action.payload : petugasTps
			})
		},
		deletePetugasTps(state, action) {
			return state.filter(petugasTps => petugasTps.id !== action.payload.id)
		}
	}
})

export const {
	createPetugasTps,
	setPetugasTps,
	updatePetugasTps,
	deletePetugasTps

} = petugasTpsSlice.actions

export default petugasTpsSlice.reducer