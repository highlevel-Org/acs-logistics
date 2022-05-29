import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import ShippingReducer from "./shippingFeature";
import  packageSlice  from "./packageFeatures";
import UserReducer from './userFeatures'

export const store = configureStore({
	reducer: {
		shipping: ShippingReducer,
		package:packageSlice,
        user:UserReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false,
		}),
});

export default store;
