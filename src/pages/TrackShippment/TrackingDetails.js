import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { css } from "@emotion/react";

import { useReactToPrint } from "react-to-print";
import Pdf from "react-to-pdf";
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';

//icons import
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import InventoryIcon from "@mui/icons-material/Inventory";

import "./Track.css";
import CancelImage from '../../assets/cancel.png'
import BaseApi from "../../services/BaseApi";

const override = css`
	position: absolute;
	top: 50%;
	right: 50%;
	transform: translate(50%, -50%);
`;

function TrackingDetails() {
	const navigate = useNavigate();
	const params = useParams();

	const { id } = params;

	const [Shippment, setShippment] = useState({});
	const [loading, setLoading] = useState(true);
	const [NoShippment, setNoShippment] = useState({
		IsError: false,
		ErrorMessage: "",
	});

	const coordinates = { lat: 0, lng: 0 };

	const printRef = useRef();

	//handle print function
	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});

	function getShippment() {
		setLoading(true);
		axios
			.get(`${BaseApi}/shippment/customerShippment/${id}`)
			.then((res) => {
				console.log(res.data);
				setShippment(res?.data?.shippment);
				setLoading(false);
			})
			.catch((error) => {
				// console.log(error?.response?.status);
				console.log(error);
				if (error?.response?.status === 500) {
					setLoading(false);
					return setNoShippment({
						IsError: true,
						ErrorMessage: error?.response?.message,
					});
				}

				if (error?.response?.status === 404) {
					setLoading(false);
					return setNoShippment({
						IsError: true,
						ErrorMessage: error?.response?.message,
					});
				}

				setNoShippment({IsError:true,ErrorMessage:error.message});
				setLoading(false);
			});
	}



	useEffect(() => {
		getShippment();
	}, []);

	console.log(Shippment);

	const pdfOption = {
		orientation: "portrait",
		unit: "mm",
		format: [210, 297],
	
	};

	return (
		<>
			{loading && (
				<ClimbingBoxLoader
					color={"#0F2C67"}
					loading={loading}
					css={override}
					size={50}
				/>
			)}

			{!loading && (
				<div className='trackPage'>
					<div className='HeaderBar'>
						<div className='headerTitle1'>
							<h2>ACS Logistics</h2>
							<LocalShippingIcon style={{ color: "white" }} />
						</div>

						<div className='headerTitle2'>
							<h3>{id}</h3>
							<InventoryIcon style={{ color: "white" }} />
						</div>
					</div>

					{/* {Shippment && ( */}
					<>
						{!NoShippment.IsError && (
							<div className='viewBodyWrapper'>
								<div className='mapView'>
									{/* <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyCbAS-86s6ofukYrm_GEp2sHSHl2SbT9sI' }}
          defaultCenter={coordinates}
  
          center={coordinates}
          defaultZoom={10}
        >
           <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          /> 
        </GoogleMapReact> */}
								</div>
								<div className='detailsView'  ref={printRef}>
									<h2 className='trackingIdTitle'>Tracking Id: {id}</h2>
									{Shippment?.serialNumber !== "" && <h2 className='trackingIdTitle'>Serial Number: {Shippment?.serialNumber}</h2>}

									<div className='details'>
										<div className='detailsList'>
											<p className='detailTitle'>Package Details</p>
											<p className='detail'>
												Package Name :{Shippment?.packageName}
											</p>
											<p className='detail'>
												Description :{Shippment?.description}
											</p>
											<p className='detail'>Weight :{Shippment?.weight} kg</p>
											<p className='detail'>Quantity :{Shippment?.quantity}</p>
											<p className='detail'>
												Shipping Cost :{Shippment?.shippingCost}
											</p>
											<p className='detail'>
												Service Type :{Shippment?.serviceType}
											</p>
											<p className='detail'>
												Current Location :
												{Shippment?.currentLocation?.reason !== ""
													? Shippment?.currentLocation?.reason
													: "Awaiting Shippment"}
											</p>
											<p className='detail'>
												Shippped Date :
												{new Date(Shippment?.shippedDate).toLocaleDateString(
													"en-NG",
													{
														weekday: "short",
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</p>
											<p className='detail'>
												Expected Delivery Date :
												{new Date(Shippment?.deliveryDate).toLocaleDateString(
													"en-NG",
													{
														weekday: "short",
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</p>
										</div>
										<div className='detailsList'>
											<p className='detailTitle'>Origin Details</p>

											<p className='detail'>
												Sender Name :{Shippment?.origin?.senderName}
											</p>
											<p className='detail'>
												Sender Email :{Shippment?.origin?.senderEmail}
											</p>
											<p className='detail'>
												Sender Address :{Shippment?.origin?.senderAddress}
											</p>
										</div>
										<div className='detailsList'>
											<p className='detailTitle'>Destination Details</p>

											<p className='detail'>
												Reciever Name :{Shippment?.destination?.receiverName}
											</p>
											<p className='detail'>
												Reciever Phone :{Shippment?.destination?.receiverPhone}
											</p>
											<p className='detail'>
												Reciever Email :{Shippment?.destination?.receiverEmail}
											</p>
											<p className='detail'>
												Reciever Address :
												{Shippment?.destination?.receiverAddress}
											</p>
										</div>
									</div>
								</div>
								<div className='actionBtn'>
									<Box sx={{ "& button": { mb: 4, m: 1 } }}>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}
										>
											<Button
												variant='contained'
												onClick={handlePrint}
												color='primary'
												size='small'
												endIcon={
													<LocalPrintshopIcon style={{ color: "white" }} />
												}
											>
												Print
											</Button>
											<Pdf
												targetRef={printRef}
												scale={1}
												options={pdfOption}
												filename={`Package ${Shippment?._id}`}
											>
												{({ toPdf }) => (
													<Button
														endIcon={
															<PictureAsPdfIcon style={{ color: "white" }} />
														}
														size='small'
														color='secondary'
														variant='contained'
														onClick={toPdf}
													>
														PDF
													</Button>
												)}
											</Pdf>
										</div>
									</Box>
								</div>
							</div>
						)}

						{NoShippment.IsError && (
							<div className='invalidIdView'>
							<img src={CancelImage} className='cancelImage' alt="error"   />
								<p>
									{NoShippment.ErrorMessage}
									{/* <Link to='/'> retry </Link> */}
{/* 
									<Button size='small' color="primary" onClick={()=>navigate('/',{replace:true})}> Click here to retry</Button> */}
								</p>
								
							

									<Button size='small' color="primary" onClick={()=>navigate('/',{replace:true})}> Click here to retry</Button>
								
							</div>
						)}
					</>
					{/* )} */}
				</div>
			)}
		</>
	);
}

export default TrackingDetails;
