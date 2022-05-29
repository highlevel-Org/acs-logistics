import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import BaseApi from "../services/BaseApi";


function getUserFromDB() {
	const usr = JSON.parse(localStorage.getItem('UserDetails'))

	return usr? usr : null
}

const initialState = {
	user: getUserFromDB(),
	Isloading: false,	
};

export const UserSlice = createSlice({
	name: "Users",
	initialState,
	reducers: {
		getUser: (state, {payload}) => {
			// state.Isloading = true;
					state.user = payload;
		},

		// addUserSuccess: (state, { payload }) => {
		// 	state.user = payload;
		// 	state.Isloading = false;
		
			
		// },
	},

	// extraReducers: (status) => {
	// 	status.addCase(LoginUser.pending, (state) => {
	// 		state.Isloading = true;
	// 	});
	// 	status.addCase(LoginUser.fulfilled, (state, payload) => {
	// 		state.user = payload;
	// 		state.IsError = false;
	// 		state.Isloading = false;
	// 	});
	// 	status.addCase(LoginUser.rejected, (state) => {
	// 		// state.user = payload;
	// 		state.Isloading = false;
	// 		state.IsError = true;
	// 	});
	// },
});

export const { getUser } = UserSlice.actions;

export const userSelector = (state) => state.user;

export default UserSlice.reducer;









//function calls
// export const LoginUser = (LoginDetails) => {
// 	// console.log("it got here");
// 	return async (dispatch) => {
// 		dispatch(getUser());
// 		try {
// 			const response = await axios.post(
// 				`${BaseApi}/auth/login`,
// 				LoginDetails
// 			);
// 			// console.log(response.data);

// 			localStorage.setItem('UserDetails',JSON.stringify(response.data))
// 			// getUserSuccess(response.data);

// 			dispatch(getUserSuccess(response.data));
// 			// return response.data;
// 		} catch (error) {
// 			console.log("Error", error);
// 		}
// 	};
// };
