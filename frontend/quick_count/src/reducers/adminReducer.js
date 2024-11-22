import {createSlice} from "@reduxjs/toolkit";

const adminSlice = createSlice({
	name: "admin",
	initialState: null,
	reducers : {
		setAdmin(state, action) {
			return action.payload
		},
		logout(state) {
			localStorage.removeItem('admin');
			return null;
		}
	}
})

export const {setAdmin, logout} = adminSlice.actions
export default adminSlice.reducer