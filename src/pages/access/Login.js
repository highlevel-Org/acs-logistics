import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
// import PasswordIcon from "@mui/icons-material/Password";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";

import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import axios from "axios";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useDispatch, useSelector } from "react-redux";

//local imports
import BaseApi from "../../services/BaseApi";
import { LoginUser, userSelector, getUser } from "../../Store/userFeatures";

// import Logo from "../../assets/acs-icon.png";

// import for styles
import "./access.css";

function Login() {
	const [values, setValues] = useState({
		email: "",
		password: "",
		showPassword: false,
	});

	const [Loading, setLoading] = useState(false);
	const [ShowError, setShowError] = useState(false);

	const dispatch = useDispatch();
	// const { Isloading, Isauthenticated, getUserSuccess } =
	// 	useSelector(userSelector);

	const navigate = useNavigate();

	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	//handler function
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	//handle sybmit function
	function HandleSubmit(e) {
		e.preventDefault();

		if (values.email === "" || values.password === "") {
			setShowError(true);
			return;
		}

		setLoading(true);
		const LoginDetails = { email: values.email, password: values.password };
		axios
			.post(`${BaseApi}/auth/login`, LoginDetails)
			.then((response) => {
				localStorage.setItem("UserDetails", JSON.stringify(response.data));
				dispatch(getUser(response.data));
				setLoading(false);
				 navigate("/dashboard", {replace:true} )
				// navigate(from, { replace: true });
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			});

		// dispatch(LoginUser(payload));

		//  navigate("/dashboard", {replace:true} )
	}

	return (
		<div className='LoginContainer'>
			<div className='formWrapper'>
				<div className='formContent'>
					{/* <img src={Logo} alt='acs' /> */}
					<h3>Login</h3>
					<form onSubmit={HandleSubmit}>
						{/* <Box
						component='form'
						onSubmit={HandleSubmit}
						sx={{
							"& > :not(style)": { m: 2, width: "90%" },
						}}
						noValidate
						autoComplete='off'
					> */}

						{ ShowError && <span style={{ color: "red" }}>
							Please enter Email and password to login*
						</span>}
						<FormControl sx={{ my: 2, width: "70%" }} variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
							<OutlinedInput
								id='outlined-adornment-email'
								type='text'
								value={values.email}
								onChange={handleChange("email")}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton aria-label='email icon' edge='end'>
											<MailIcon color='primary' />
										</IconButton>
									</InputAdornment>
								}
								label='Email'
							/>
						</FormControl>

						<FormControl sx={{ my: 2, width: "70%" }} variant='outlined'>
							<InputLabel htmlFor='outlined-adornment-password'>
								Password
							</InputLabel>
							<OutlinedInput
								id='outlined-adornment-password'
								type={values.showPassword ? "text" : "password"}
								value={values.password}
								onChange={handleChange("password")}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle password visibility'
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge='end'
										>
											{values.showPassword ? (
												<VisibilityOff color='primary' />
											) : (
												<Visibility color='primary' />
											)}
										</IconButton>
									</InputAdornment>
								}
								label='Password'
							/>
						</FormControl>
						<Stack
							direction='row'
							sx={{
								m: 2,
								alignSelf: "center",
								display: "flex",
								flexDirection: "column",
							}}
							spacing={2}
						>
							{/* <Button variant='contained' type='submit' endIcon={<SendIcon />}>
								Login
							</Button> */}

							<LoadingButton
								// size='small'
								// onClick={handleClick}
								type='submit'
								endIcon={<SendIcon style={{ color: "white" }} />}
								loading={Loading}
								loadingPosition='end'
								variant='contained'
							>
								Login
							</LoadingButton>
						</Stack>
						{/* </Box> */}
					</form>
					<p>
						Don't have an account ? <Link to='/register'>Register here</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
