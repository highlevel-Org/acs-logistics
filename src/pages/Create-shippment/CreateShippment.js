import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";

import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";

import EuroIcon from "@mui/icons-material/Euro";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ScaleIcon from "@mui/icons-material/Scale";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AddCardIcon from '@mui/icons-material/AddCard';
import PersonIcon from '@mui/icons-material/Person';

// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

//Local imports
import Header from "../../components/PageHeader/Header";
import { userSelector } from "../../Store/userFeatures";
import { postShippment, shippmentSelector } from "../../Store/shippingFeature";

//import page styling
import "./CreateShippment.css";

const Input = styled("input")({
	display: "none",
});

function CreateShippment() {
	const [values, setValues] = useState({
		packageName: "",
		description: "",
		qauntity: 1,
		weight: 1,
		serviceType: "",
		serialNumber: "",
		shippingCost: "",
		deleiveryDate: Date.now(),
		// completed: false,
		senderName: "",
		senderEmail: "",
		// senderPhone: "",
		senderAddress: "",
		senderLat: "",
		senderLng: "",
		receiverName: "",
		receiverEmail: "",
		receiverPhone: "",
		receiverAddress: "",
		receiverLat: "",
		receiverLng: "",
	});

	// const [date, setdate] = useState(Date.now());

	const [imageUrl, setImageUrl] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector(userSelector);
	const { IsLoading, IsSuccess } = useSelector(shippmentSelector);

	const userId = user?.data?._doc?._id;
	const usertoken = user?.token;

	// console.log('here:',userId,token)

	//handler function
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	//function to handle image upload
	function Base64Image(e) {
		const file = e.target.files[0];

		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImageUrl(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}

	//function to submit form
	function HandleSubmit(e) {
		e.preventDefault();

		const payload = {
			packageName: values.packageName,
			quantity: values.qauntity,
			description: values.description,
			weight: values.weight,
			completed: false,
			imageUrl,
			serialNumber:values.serialNumber,
			serviceType: values.serviceType,
			deliveryDate: values.deleiveryDate,
			shippingCost: values.shippingCost,

			origin: {
				senderName: values.senderName,
				senderEmail: values.senderEmail,
				senderAddress: values.senderAddress,
				originCordinates: { lat: values.senderLat, long: values.senderLng },
			},

			currentLocation: {
				reason: "",
				currentCordinates: { lat: values.senderLat, long: values.senderLng },
			},

			destination: {
				receiverName: values.receiverName,
				receiverEmail: values.receiverEmail,
				receiverPhone: values.receiverPhone,
				receiverAddress: values.receiverAddress,
				receiverCordinates: {
					lat: values.receiverLat,
					long: values.receiverLng,
				},
			},

			user: userId,
		};

		if (
			values.packageName === "" ||
			values.shippingCost === "" ||
			values.description === ""
		) {
			return toast.error("Enter all required filed to proceed!", {
				icon: "🥺",
			});
		}

		dispatch(postShippment({ payload, usertoken }));
		if (!IsLoading) {
			navigate("/shippments");
		}
	}

	// console.log(usertoken)

	return (
		<>
			<Header title='Create Shippment' />
			<div className='pageWrapper'>
				<p>
					Please fill all <span style={{ color: "red" }}>*</span> important
					fileds to create shippment
				</p>
				<div className='formWrapper'>
					<Box
						component='form'
						onSubmit={HandleSubmit}
						sx={{
							"& > :not(style)": { m: 2, width: "90%" },
						}}
						alignItems='center'
						justifyContent='center'
						noValidate
						autoComplete='off'
					>
						<Grid container spacing={2}>
							<span>Package Details</span>
							<Grid item xs={12}>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Package Name
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										required
										value={values.packageName}
										onChange={handleChange("packageName")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<DriveFileRenameOutlineIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Description
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										multiline
										value={values.description}
										onChange={handleChange("description")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<DescriptionIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Qty
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-qauntity'
										type='number'
										min={1}
										value={values.qauntity}
										onChange={handleChange("qauntity")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='sales icon' edge='end'>
													<ScaleIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='qauntity'
									/>
								</FormControl>
								<TextField
									label='Weight'
									type='number'
									value={values.weight}
									onChange={handleChange("weight")}
									id='outlined-start-adornment'
									sx={{ m: 1, width: "25ch" }}
									InputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
										endAdornment: (
											<InputAdornment position='start'>kg</InputAdornment>
										),
									}}
								/>

<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='serialNumber'>
										Serial Number
									</InputLabel>
									<OutlinedInput
										id='serialNumber'
										type='text'
										required
										value={values.serialNumber}
										onChange={handleChange("serialNumber")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<AddCardIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
					
								<FormControl sx={{ m: 1, width: "27ch" }}>
									<InputLabel id='serviceType'>ServiceType</InputLabel>
									<Select
										labelId='serviceType'
										id='serviceType'
										value={values.serviceType}
										label='ServiceType'
										onChange={handleChange("serviceType")}
									>
										<MenuItem value=''>
											<em>None</em>
										</MenuItem>
										<MenuItem value='shipping'>Express Shipping</MenuItem>
										<MenuItem value='pickup'>PickUp</MenuItem>
									</Select>
								</FormControl>

								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-cost'>
										Shipping Cost
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-cost'
										type='text'
										required
										value={values.shippingCost}
										onChange={handleChange("shippingCost")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<EuroIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='cost'
									/>
								</FormControl>

								<FormControl sx={{ mt: 2, width: "27ch", ml: 3 }}>
									<label htmlFor='contained-button-file'>
										<Input
											accept='image/*'
											id='contained-button-file'
											// multiple
											type='file'
											onChange={Base64Image}
										/>
										<Button
											variant='contained'
											component='span'
											endIcon={<PhotoCamera style={{ color: "white" }} />}
										>
											Upload Image
										</Button>
									</label>
								</FormControl>
							</Grid>
							<span style={{ marginTop: "10px" }}>Origin Details</span>
							<Grid item xs={12}>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Sender
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.senderName}
										onChange={handleChange("senderName")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<PersonIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Email
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='email'
										value={values.senderEmail}
										onChange={handleChange("senderEmail")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<AttachEmailIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>

								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Address
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										multiline
										value={values.senderAddress}
										onChange={handleChange("senderAddress")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<EditLocationAltIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>

								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Latitude
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.senderLat}
										onChange={handleChange("senderLat")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<AddLocationIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Longitude
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.senderLng}
										onChange={handleChange("senderLng")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<AddLocationIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
							</Grid>

							<span style={{ marginTop: "10px" }}>Destination Details</span>
							<Grid item xs={12}>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Receiver
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.receiverName}
										onChange={handleChange("receiverName")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<PersonIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Phone
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.receiverPhone}
										onChange={handleChange("receiverPhone")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<LocalPhoneIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Email
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.receiverEmail}
										onChange={handleChange("receiverEmail")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<AttachEmailIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>

								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Address
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										multiline
										value={values.receiverAddress}
										onChange={handleChange("receiverAddress")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<EditLocationAltIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>

								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Latitude
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.receiverLat}
										onChange={handleChange("receiverLat")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<AddLocationIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>
								<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
									<InputLabel htmlFor='outlined-adornment-email'>
										Longitude
									</InputLabel>
									<OutlinedInput
										id='outlined-adornment-description'
										type='text'
										value={values.receiverLng}
										onChange={handleChange("receiverLng")}
										endAdornment={
											<InputAdornment position='end'>
												<IconButton aria-label='description icon' edge='end'>
													<AddLocationIcon color='primary' />
												</IconButton>
											</InputAdornment>
										}
										label='Email'
									/>
								</FormControl>

								<FormControl sx={{ m: 1, width: "27ch" }}>
									<DesktopDatePicker
										label='Delivery Date'
										inputFormat='MM/dd/yyyy'
										value={values.deleiveryDate}
										onChange={(e) => setValues({ ...values, deleiveryDate: e })}
										renderInput={(params) => <TextField {...params} />}
									/>
								</FormControl>
							</Grid>
						</Grid>

						<Stack
							direction='row'
							sx={{
								m: 2,
								alignSelf: "center",
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
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
								endIcon={<SaveAsIcon style={{ color: "white" }} />}
								loading={IsLoading}
								loadingPosition='end'
								variant='contained'
							>
								Create
							</LoadingButton>
						</Stack>
					</Box>
				</div>
			</div>
		</>
	);
}

export default CreateShippment;
