import React, { useState } from "react";
import {  Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ToastContainer, toast } from "react-toastify";

//Page imports
import Dashboard from "./pages/Dashboard/Dashboard";
import AllShippment from "./pages/All-Shippment/AllShippment";
import CompletedShippment from "./pages/Completed-Shippment/CompletedShippment";
import Login from "./pages/access/Login";
import Register from "./pages/access/Register";
import TrackingDetails from "./pages/TrackShippment/TrackingDetails";
import Track from "./pages/TrackShippment/Track";
import CreateShippment from "./pages/Create-shippment/CreateShippment";
import Shippment from "./pages/shippment/Shippment";
import NotFound from "./pages/access/NotFound";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

//components and services imports
import SideNav from "./components/SideNav/SideNav";
import Layout from "./RouteConfig/Layout";
import Auth from "./RouteConfig/Protected";


const theme = createTheme({
	// status: {
	// 	danger: "#CD1818",
	// },

	palette: {
		primary: {
			main: "#0076c6",
		},
		secondary: {
			main: "#F3950D",
		},
		danger: {
			main: "#d32f2f",
		},
		// contrastThreshold: 3,
		// tonalOffset: 0.2,
	},
});

function App() {
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<ToastContainer
					position='top-center'
					autoClose={4000}
					hideProgressBar={true}
					newestOnTop={true}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<ThemeProvider theme={theme}>
						<SideNav>
			
							<Routes>
								{/* Public routes */}
								<Route path='/' element={<Layout />}>
									<Route path='/'  element={<Track />} />
									<Route path='track/:id' element={<TrackingDetails />} />
									<Route path='login' element={<Login />} />
									<Route path='register' element={<Register />} />

									{/* Protected routes */}
									<Route element={<Auth />}>
										<Route path='dashboard' element={<Dashboard />} />
										<Route path='shippments' element={<AllShippment />} />
										<Route
											path='shippments/:id'
											element={<Shippment />}
										/>

								
										<Route path='create' element={<CreateShippment />} />
										<Route path='completed' element={<CompletedShippment />} />
									</Route>

									{/* Not found route */}
									<Route path='*' element={<NotFound />} />
								</Route>
							</Routes>
				
						</SideNav>
				</ThemeProvider>
			</LocalizationProvider>
		</>
	);
}

export default App;

/* <div>
			<SideNav ShowNav={ShowNav} setShowNav={setShowNav} />
		</div> */
