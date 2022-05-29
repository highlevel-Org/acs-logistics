import React, { useState, useEffect, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import Pdf from "react-to-pdf";

import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Modal from "@mui/material/Modal";
import Tooltip from '@mui/material/Tooltip';

import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import SaveAsIcon from "@mui/icons-material/SaveAs";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import CloseIcon from "@mui/icons-material/Close";
import ScaleIcon from "@mui/icons-material/Scale";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

// import { styled } from '@mui/material/styles';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { styled } from "@mui/material/styles";

// import Stack from '@mui/material/Stack';

import Header from "../../components/PageHeader/Header";
import {
	packageSelector,
	getShippment,
	updateShippment,
	removePackage,
} from "../../Store/packageFeatures";
import { userSelector } from "../../Store/userFeatures";
import "./Shippment.css";
import { Stack } from "@mui/material";

//custom style for modal box

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "50%",
	bgcolor: "background.paper",
	boxShadow: 24,
	outline: 0,
	p: 4,
	// pt:12,
	overflowY: "scroll",
	display: "flex",
	flexDirection: "center",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "15px",
};

const Android12Switch = styled(Switch)(({ theme }) => ({
	padding: 8,
	"& .MuiSwitch-track": {
		borderRadius: 22 / 2,
		"&:before, &:after": {
			content: '""',
			position: "absolute",
			top: "50%",
			transform: "translateY(-50%)",
			width: 16,
			height: 16,
		},
		"&:before": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
			left: 12,
		},
		"&:after": {
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
				theme.palette.getContrastText(theme.palette.primary.main)
			)}" d="M19,13H5V11H19V13Z" /></svg>')`,
			right: 12,
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "none",
		width: 16,
		height: 16,
		margin: 2,
	},
}));

function Shippment() {
	const { IsLoading, packageShipment } = useSelector(packageSelector);
	const params = useParams();
	const navigate = useNavigate();

	const [windDimension, setwindDimension] = useState({
		winWidth: window.innerWidth,
		winHeight: window.innerHeight,
	});

	const { id } = params;

	const detectSize = () => {
		setwindDimension({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight,
		});
	};

	function FormValues() {
		return {
			packageName: packageShipment?.shippment?.packageName,
			description: packageShipment?.shippment?.description,
			qauntity: packageShipment?.shippment?.quantity,
			weight: packageShipment?.shippment?.weight,
			serviceType: packageShipment?.shippment?.serviceType,
			deleiveryDate: new Date(
				packageShipment?.shippment?.deliveryDate?.split("T")[0]
			),
			// completed: false,
			currentLocationReason:
				packageShipment?.shippment?.currentLocation?.reason,
			currentLocationLat:
				packageShipment?.shippment?.currentLocation?.currentCordinates?.lat,
			currentLocationLong:
				packageShipment?.shippment?.currentLocation?.currentCordinates?.long,

			senderName: packageShipment?.shippment?.origin?.senderName,
			senderEmail: packageShipment?.shippment?.origin?.senderEmail,
			// senderPhone: "",
			senderAddress: packageShipment?.shippment?.origin?.senderAddress,
			senderLat: packageShipment?.shippment?.origin?.originCordinates?.lat,
			senderLng: packageShipment?.shippment?.origin?.originCordinates?.long,
			receiverName: packageShipment?.shippment?.destination?.receiverName,
			receiverEmail: packageShipment?.shippment?.destination?.receiverEmail,
			receiverPhone: packageShipment?.shippment?.destination?.receiverPhone,
			receiverAddress: packageShipment?.shippment?.destination?.receiverAddress,
			receiverLat:
				packageShipment?.shippment?.destination?.receiverCordinates?.lat,
			receiverLng:
				packageShipment?.shippment?.destination?.receiverCordinates?.long,
		};
	}

	const [open, setOpen] = useState(false);

	const [values, setValues] = useState();
	const dispatch = useDispatch();

	const { user } = useSelector(userSelector);

	const usertoken = user?.token;

	//handler function
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const printRef = useRef();

	//handle print function
	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});


	function copyID() {
		navigator.clipboard.writeText(id);
	}

	const pdfOption = {
		orientation: "portrait",
		unit: "mm",
		format: [210, 297],
	};

	//Delete package function
	function DeletePackge() {
		// console.log({usertoken,id})
		dispatch(removePackage({ usertoken, id }));

		navigate("/shippments", { replace: true });
	}

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	//function to submit form
	function HandleUpdate(e) {
		e.preventDefault();

		const payload = {
			packageName: values.packageName,
			quantity: values.qauntity,
			description: values.description,
			weight: values.weight,
			completed: false,
			imageUrl: packageShipment?.shippment?.imageUrl,
			serviceType: values.serviceType,
			deliveryDate: values.deleiveryDate,
			// shippedDate: ,

			origin: {
				senderName: values.senderName,
				senderEmail: values.senderEmail,
				senderAddress: values.senderAddress,
				originCordinates: { lat: values.senderLat, long: values.senderLng },
			},

			currentLocation: {
				reason: values.currentLocationReason,
				currentCordinates: {
					lat: values.currentLocationLat,
					long: values.currentLocationLong,
				},
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

			user: user,
		};

		// console.log("update",payload)

		dispatch(updateShippment({ payload, usertoken, id }));

		handleClose();

		dispatch(getShippment({ usertoken, id }));

		// if (IsSuccess) {
		// 	navigate('/all')

		// }
	}

	useEffect(() => {
		dispatch(getShippment({ usertoken, id }));
	}, []);

	useEffect(() => {
		setValues(() => FormValues());
	}, [packageShipment]);

	useEffect(() => {
		window.addEventListener("resize", detectSize);

		return () => {
			window.removeEventListener("resize", detectSize);
		};
	}, [windDimension]);

	// console.log(windDimension);

	return (
		<>
			<Header title={`Shippment:${id}`} />

			{packageShipment.shippment && (
				<div className='pageWrapper'>
					{/* <div className='mapBox'></div> */}
					<div className='detailsBox'>
						<Stack
							spacing={2}
							// direction={{ xs: 'column', sm: 'row' }}
							style={{ width: "100%" }}
						>
							<Box ref={printRef}  p={4}  pb={0}>
							<Card
								elevation={3}
								mb={2}
							
								style={{
									width: "100%",
									display: "flex",
									justifyContent: "space-between",
									maxHeight: "200px",
									marginBottom:'5px'
								}}
							>
								<CardContent  >
									<Stack
										direction='row'
										spacing={2}
									
										xs={{
											width: "100%",
											alignItems:'center'
										}}
									>
									 <Tooltip title="CLICK TO COPY ID"  placement="top-end" followCursor arrow>
										<h4 id='hiddenTitle'  onClick={copyID}>
										ACS Logistics	Package ID :- {`${packageShipment?.shippment?._id}`}
										</h4>

									 </Tooltip>
									
									</Stack>
								</CardContent>
								</Card>

								<Card
									mt={2}
									elevation={3}
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "space-between",
										maxHeight: "400px",
									}}
								>
									<CardContent
										sx={{
											width: "70%",
											height: "100%",
											alignItems: "center",
											justifyContent: "center",
										}}
										// alignItems="center"
										// justifyContent='center'
									>
										<div className='boxDetails'>
											<h4 className='boxDetailsTitle'>PACKAGE DETAILS</h4>

											<p>
												Package Name:{packageShipment?.shippment?.packageName}
											</p>
											<p>
												Description:{packageShipment?.shippment?.description}
											</p>
											<p>Quantity:{packageShipment?.shippment?.quantity}</p>
											<p>Weight:{packageShipment?.shippment?.weight} kg</p>

											<p>
												Delivery Date:
												{new Date(
													packageShipment?.shippment?.deliveryDate
												).toLocaleDateString("en-NG", {
													weekday: "short",
													year: "numeric",
													month: "short",
													day: "numeric",
												})}
											</p>
											<p>
												Service Type:{packageShipment?.shippment?.serviceType}
											</p>
											<p>
												Shipping Cost:{packageShipment?.shippment?.shippingCost}
											</p>
											<p>
												Completed:
												{packageShipment?.shippment?.completed ? "Yes" : "No"}
											</p>
										</div>
									</CardContent>
									{packageShipment?.shippment?.imageUrl ? (
										<CardMedia
											component='img'
											sx={{ width: "40%", height: "100%" }}
											image={packageShipment?.shippment?.imageUrl}
											alt='Live from space album cover'
										/>
									) : (
										""
									)}
								</Card>

								<Stack direction='row' spacing={1} mt={2}>
									<Card elevation={3} style={{ width: "33.3%" }}>
										<CardContent>
											<div className='boxDetails'>
												<h4 className='boxDetailsTitle'>SOURCE DETAILS</h4>
												<p>
													Sender Name:
													{packageShipment?.shippment?.origin?.senderName}
												</p>
												<p>
													Sender Email:
													{packageShipment?.shippment?.origin?.senderEmail}
												</p>
												<p>
													Sender Address:
													{packageShipment?.shippment?.origin?.senderAddress}
												</p>
												<p>
													Latitude:
													{
														packageShipment?.shippment?.origin?.originCordinates
															?.lat
													}
												</p>
												<p>
													Longitude:
													{
														packageShipment?.shippment?.origin?.originCordinates
															?.long
													}
												</p>
											</div>
										</CardContent>
									</Card>
									<Card
										elevation={3}
										style={{
											width: "33.3%",
										}}
									>
										<CardContent>
											<div className='boxDetails'>
												<h4 className='boxDetailsTitle'>CURRENT STATUS</h4>

												<p>
													Reason:
													{packageShipment?.shippment?.currentLocation?.reason}
												</p>
												<p>
													Latitude:
													{
														packageShipment?.shippment?.currentLocation
															?.currentCordinates?.lat
													}
												</p>
												<p>
													Longitude:
													{
														packageShipment?.shippment?.currentLocation
															?.currentCordinates?.long
													}
												</p>
											</div>
										</CardContent>
									</Card>

									<Card elevation={3} style={{ width: "33.3%" }}>
										<CardContent>
											<div className='boxDetails'>
												<h4 className='boxDetailsTitle'>DESTINATION DETAILS</h4>
												<p>
													Receiver Name:
													{
														packageShipment?.shippment?.destination
															?.receiverName
													}
												</p>
												<p>
													Receiver Phone:
													{
														packageShipment?.shippment?.destination
															?.receiverPhone
													}
												</p>
												<p>
													Receiver Email:
													{
														packageShipment?.shippment?.destination
															?.receiverEmail
													}
												</p>
												<p>
													Receiver Address:
													{
														packageShipment?.shippment?.destination
															?.receiverAddress
													}
												</p>
												<p>
													Latitude:
													{
														packageShipment?.shippment?.destination
															?.receiverCordinates?.lat
													}
												</p>
												<p>
													Longitude:
													{
														packageShipment?.shippment?.destination
															?.receiverCordinates?.long
													}
												</p>
											</div>
										</CardContent>
									</Card>
								</Stack>
							</Box>

							<Card
								elevation={0}
							>
								<CardContent>
									<Stack

										direction='row'
										spacing={2}
										alignItems='center'
										justifyContent='center'
										xs={{
											width: "80%",
										}}
									>
										<Button
											size='small'
											variant='contained'
											endIcon={
												<LocalPrintshopIcon style={{ color: "white" }} />
											}
											onClick={handlePrint}
										>
											Print
										</Button>

										<Pdf
											targetRef={printRef}
											scale={1}
											options={pdfOption}
											filename={`ACS package-${packageShipment?.shippment?._id}`}
										>
											{({ toPdf }) => (
												<Button
													endIcon={
														<PictureAsPdfIcon style={{ color: "white" }} />
													}
													size='small'
													color='danger'
													variant='contained'
													onClick={toPdf}
												>
													PDF
												</Button>
											)}
										</Pdf>
										<Button
											size='small'
											variant='contained'
											color='secondary'
											onClick={DeletePackge}
											startIcon={<DeleteIcon style={{ color: "white" }} />}
										>
											Delete
										</Button>
										<Button
											size='small'
											onClick={handleOpen}
											variant='contained'
											endIcon={<EditIcon style={{ color: "white" }} />}
										>
											Update
										</Button>
									</Stack>
								</CardContent>
							</Card>
						</Stack>
					</div>

					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby='keep-mounted-modal-title'
						aria-describedby='keep-mounted-modal-description'
					>
						{packageShipment?.shippment && (
							<Box
								component='form'
								onSubmit={HandleUpdate}
								// sx={{

								// 	"& > :not(style)": {
								// 		m: 1,
								// 		width: "100%",
								// 		border: "1px solid red",
								// 	},
								// 	paddingTop:'20px',

								// 	// '& .MuiTextField-root': { m: 1, width: '25ch' },
								// }}

								sx={{
									...style,
									paddingTop: windDimension?.winWidth < 1200 ? "50%" : "10%",
								}}
								noValidate
								autoComplete='off'
							>
								<Typography
									variant='h5'
									color='primary'
									component='div'
									gutterBottom
								>
									Updating package : {id}
								</Typography>

								<div style={{ width: "100%" }}>
									<Typography
										variant='subtitle1'
										color='primary'
										mt={2}
										component='h6'
									>
										Package Details
									</Typography>

									<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
										<InputLabel htmlFor='outlined-adornment-email'>
											Package Name
										</InputLabel>
										<OutlinedInput
											id='outlined-adornment-description'
											type='text'
											required
											value={values?.packageName}
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
											value={values?.description}
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
											value={values?.qauntity}
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
										value={values?.weight}
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

									<FormControl sx={{ m: 1, width: "27ch" }}>
										<InputLabel id='serviceType'>ServiceType</InputLabel>
										<Select
											labelId='serviceType'
											id='serviceType'
											value={values?.serviceType}
											label='ServiceType'
											onChange={handleChange("serviceType")}
										>
											<MenuItem value=''>
												<em>None</em>
											</MenuItem>
											<MenuItem value='shipping'>shipping</MenuItem>
											<MenuItem value='pickup'>PickUp</MenuItem>
										</Select>
									</FormControl>

									<FormControl sx={{ m: 1, width: "27ch" }}>
										<FormControlLabel
											control={
												<Android12Switch
													checked={values?.completed}
													onChange={handleChange}
												/>
											}
											label={"Completed"}
										/>
									</FormControl>
								</div>

								<div style={{ width: "100%" }}>
									<Typography
										variant='subtitle1'
										color='primary'
										mt={2}
										component='h6'
									>
										Origin Details
									</Typography>
									<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
										<InputLabel htmlFor='outlined-adornment-email'>
											Sender
										</InputLabel>
										<OutlinedInput
											id='outlined-adornment-description'
											type='text'
											value={values?.senderName}
											onChange={handleChange("senderName")}
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
											Email
										</InputLabel>
										<OutlinedInput
											id='outlined-adornment-description'
											type='email'
											value={values?.senderEmail}
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
											value={values?.senderAddress}
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
											value={values?.senderLat}
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
											value={values?.senderLng}
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
								</div>

								<div style={{ width: "100%" }}>
									<Typography
										variant='subtitle1'
										color='primary'
										mt={2}
										component='h6'
									>
										Current Location Details
									</Typography>

									<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
										<InputLabel htmlFor='outlined-adornment-email'>
											Status
										</InputLabel>
										<OutlinedInput
											id='outlined-adornment-description'
											type='text'
											value={values?.currentLocationReason}
											onChange={handleChange("currentLocationReason")}
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
											Latitude
										</InputLabel>
										<OutlinedInput
											id='outlined-adornment-description'
											type='text'
											value={values?.currentLocationLat}
											onChange={handleChange("currentLocationLat")}
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
											value={values?.currentLocationLong}
											onChange={handleChange("currentLocationLong")}
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
								</div>

								<div style={{ width: "100%" }}>
									<Typography
										variant='subtitle1'
										color='primary'
										mt={2}
										component='h6'
									>
										Destination Details
									</Typography>

									<FormControl sx={{ m: 1, width: "27ch" }} variant='outlined'>
										<InputLabel htmlFor='outlined-adornment-email'>
											Receiver
										</InputLabel>
										<OutlinedInput
											id='outlined-adornment-description'
											type='text'
											value={values?.receiverName}
											onChange={handleChange("receiverName")}
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
											Phone
										</InputLabel>
										<OutlinedInput
											id='outlined-adornment-description'
											type='text'
											value={values?.receiverPhone}
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
											value={values?.receiverEmail}
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
											value={values?.receiverAddress}
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
											value={values?.receiverLat}
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
											value={values?.receiverLng}
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
											value={values?.deleiveryDate}
											onChange={(e) =>
												setValues({ ...values, deleiveryDate: e })
											}
											renderInput={(params) => <TextField {...params} />}
										/>
									</FormControl>
								</div>

								<Stack
									direction='row'
									// mb={2}
									sx={{
										mt: 2,
										pb: 2,
										alignSelf: "center",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
									}}
									spacing={2}
								>
									{/* <Button variant='contained' onClick={handleClose} endIcon={<CloseIcon style={{ color: "white" }} />}>
								Cancle
							</Button> */}

									<LoadingButton
										// size='small'
										// onClick={handleClick}
										type='submit'
										endIcon={<SaveAsIcon style={{ color: "white" }} />}
										// loading={Isloading}
										loadingPosition='end'
										variant='contained'
									>
										Update
									</LoadingButton>
								</Stack>
								{/* </form>} */}

								{/* </div> */}
							</Box>
						)}
					</Modal>
				</div>
			)}
		</>
	);
}

export default Shippment;
