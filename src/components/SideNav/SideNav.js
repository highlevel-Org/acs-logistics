import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import sidebarData from "../Data/sidebarData";
import Logo from "../../assets/acs-icon.png";
import "./SideNav.css";

function SideNav({ children }) {
	const [ShowNav, setShowNav] = useState(true);
	const [OpenNav, setOpenNav] = useState(false);

	const Location = useLocation().pathname;
	const navigate = useNavigate();

	useEffect(() => {
		// if (Location === "track/") {
		// 	setShowNav(false);

		// }else

		if (Location === "/dashboard") {
			setShowNav(true);
		} else if (Location === "/shippments") {
			setShowNav(true);
		} else if (Location.includes("/shippments/")) {
			setShowNav(true);
		} else if (Location === "/create") {
			setShowNav(true);
		} else if (Location === "/completed") {
			setShowNav(true);
		} else {
			setShowNav(false);
		}

		// if(Location === "/"){
		// 	setShowNav(false);

		// }else if (Location === "/login") {
		// 	setShowNav(false);
		// } else if (Location === "/register") {
		// 	setShowNav(false);
		// } else if (Location === "/track") {
		// 	setShowNav(false);
		// }else if (Location === "/track/*") {
		// 	setShowNav(false);
		// }else{
		// 	setShowNav(true)
		// }
	}, [Location]);

	const NavClass = `${ShowNav ? "sideNavContainer" : "hideNav"}`;

	// const linkAnimation = {
	// 	hidden:{
	// 		width:0,
	// 		padding:0
	// 	},
	// 	show:{
	// 		width:'80%',
	// 		padding:'14px 0px 14px 10px',
	// 		transition:{
	// 			duration:0.2
	// 		}
	// 	}
	// }

	function Toggle() {
		setOpenNav(!OpenNav);
	}

	function Logout() {
		localStorage.clear();
		return navigate("/");
	}

	return (
		<div className="container">
			<motion.div
				className={NavClass}
				animate={{ width: OpenNav ? "17%" : "0%" }}
			>
				{/* <img src={Logo} alt="acs" srcset="" style={{width:'200px',height:'200px'}} /> */}

				<div className="LogoName">{OpenNav && <h2>ACS Logistics</h2>}</div>
				{ShowNav && (
					<div className="navControl">
						{OpenNav ? (
							<ChevronLeftIcon style={{ fontSize: 40 }} onClick={Toggle} />
						) : (
							<ChevronRightIcon style={{ fontSize: 40 }} onClick={Toggle} />
						)}
					</div>
				)}
				{OpenNav && (
					<div className="navList">
						{sidebarData.map((nav, index) => {
							return (
								<Link
									to={nav.link}
									key={index}
									className="navListItem"
									id={Location == nav.link ? "active" : ""}
								>
									<span>{nav.icon}</span>
									<p>{nav.title}</p>
								</Link>
							);
						})}

						<div
							onClick={Logout}
							//  to={nav.link}
							//   key={index}
							//  id={Location == nav.link ? "active":""}
							className="navListItem"
						>
							<span>
								<ExitToAppIcon sx={{ fontSize: 30, color: "white" }} />
							</span>
							<p>Logout</p>
						</div>
					</div>
				)}
			</motion.div>

			<main style={{ width: OpenNav ? "83%" : "100%" }}>{children}</main>
		</div>
	);
}

// paddingLeft:OpenNav?'10px':'5px'

export default SideNav;
