import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";

//icons import
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import "./Track.css";

function Track() {
	const [Id, setId] = useState("");

	const [Validate, setValidate] = useState(false);

	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();

		if (Id === "") {
			return setValidate(true);
		}

		navigate(`/track/${Id}`);
	}

	return (
		<>
		<div className='trackPage'>
			<div className='HeaderBar'>
				<div className='headerTitle1'>
					<h2>ACS Logistics</h2>
					<LocalShippingIcon style={{ color: "white" }} />
				</div>

				<div className='headerTitle2'>
					<h3>Customer Tracking Portal</h3>
					<FmdGoodIcon style={{ color: "white" }} />
				</div>
			</div>

			<div className='formBodyWarpper'>
				<h3 className='formTitle'>Please enter tracking Id to proceed</h3>
				<form className='trackingForm' onSubmit={handleSubmit}>
					{Validate && (
						<span
							style={{ color: "red", textAlign: "center", marginBottom: "5px" }}
						>
							Enter tracking Id*
						</span>
					)}
					<input
						type='text'
						value={Id}
						onChange={(e) => setId(e.target.value)}
						maxLength={24}
						placeholder='Input tracking Id'
						className='trackingIdInput'
						onFocus={()=>setValidate(false)}
					/>

					<Button
						variant='contained'
						color='primary'
						type='submit'
						endIcon={<ContentPasteSearchIcon style={{ color: "white" }} />}
					>
						Search
					</Button>
				</form>
			</div>

		</div>
			<footer>
				<p className='footerTitle'>
					{" "}
					&copy; {new Date().getFullYear()} ACS Logistics
				</p>

				<div className='footerItems'>
					<p>Contact Us</p>
					<ul>
						<li>
							<a href='mailto:support@acl-logistics.net'  target='_blank' rel='noopener noreferrer'>
								<EmailIcon />
							</a>
						</li>
						<li>
							<a href='http://' target='_blank' rel='noopener noreferrer'>
								<TwitterIcon />
							</a>
						</li>
						<li>
							<a href='http://' target='_blank' rel='noopener noreferrer'>
								<FacebookIcon />
							</a>
						</li>
					</ul>
				</div>
			</footer>

		</>
	);
}

export default Track;
