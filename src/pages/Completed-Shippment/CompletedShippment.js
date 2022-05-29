import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import TableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
// import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import ContentLoader, { Facebook } from 'react-content-loader'

import { useDispatch, useSelector } from "react-redux";

import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GridOnIcon from "@mui/icons-material/GridOn";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import Header from "../../components/PageHeader/Header";
import Loader from '../../components/Loader/Loader'
import { userSelector } from "../../Store/userFeatures";
import {
	shippmentSelector,
	getAllShippment,
	removeShippment,
} from "../../Store/shippingFeature";

const columns = [
	"S/N",
	"PACKAGE",
	"SENDER",
	"RCEIVER",
	"DATE SHIPPED",
	"DELIVERY DATE",
	"COMPLETED",
];

function CompletedShippment() {

  const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const dispatch = useDispatch();

	const { user } = useSelector(userSelector);
	const { IsLoading, AllShippment,IsDeleted } = useSelector(shippmentSelector);
	const userToken = user?.token;
  const userId = user?.data?._doc?._id;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};



  useEffect(() => {
		dispatch(getAllShippment({userToken,userId}));
	}, []);
  return (

    <>
<Header  title="Completed Shippment"/>
<div className='pageWrapper'>
				
				{!IsLoading? <div className='shippmentList'>
					<Paper sx={{ width: "100%", padding: "2px" }}>
						<Stack direction='row' justifyContent='end' m={2} spacing={1}>
							<Button
								size='small'
								variant='contained'
								endIcon={<LocalPrintshopIcon />}
							>
								Print
							</Button>
							<Button
								endIcon={<PictureAsPdfIcon />}
								size='small'
								color='danger'
								variant='contained'
							>
								PDF
							</Button>
							<Button
								size='small'
								color='secondary'
								variant='contained'
								endIcon={<GridOnIcon />}
							>
								Excel
							</Button>
						</Stack>
					</Paper>
					{AllShippment.length > 0 ? (
						<Paper sx={{ width: "100%" }}>
							<TableContainer sx={{ maxHeight: 600 }}>
								<Table stickyHeader aria-label='sticky table'>
									<TableHead>
										<TableRow>
											{columns.map((column, id) => (
												<TableCell
													key={id}
													align='center'
													style={{ minWidth: 30, width: 30 }}
												>
													{column}
												</TableCell>
											))}
										</TableRow>
									</TableHead>
									<TableBody>
										{[...AllShippment].reverse()?.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										).map((row, idx) => {
											return (
												<TableRow
													//  component={Link}
													//  to={`/${row._id}`}
													hover
													role='checkbox'
													tabIndex={-1}
													key={idx}
												>
													<TableCell
														align='center'
														style={{ minWidth: 30, width: 30 }}
													>
														{idx + 1}
													</TableCell>
													<TableCell
														align='center'
														style={{ minWidth: 30, width: 40 }}
													>
														{row?.packageName}
													</TableCell>

													<TableCell
														align='center'
														style={{ minWidth: 30, width: 30 }}
													>
														{row?.origin?.senderName
															? row?.origin?.senderName
															: "Nil"}
													</TableCell>
													<TableCell
														align='center'
														style={{ minWidth: 30, width: 30 }}
													>
														{row?.destination?.receiverName
															? row?.destination?.receiverName
															: "Nil"}
													</TableCell>
													<TableCell
														align='center'
														style={{ minWidth: 30, width: 30 }}
													>
														{new Date(row?.createdAt).toLocaleDateString()}
													</TableCell>
													<TableCell
														align='center'
														style={{ minWidth: 30, width: 30 }}
													>
														{new Date(row?.deliveryDate).toLocaleDateString()}
													</TableCell>
													<TableCell align='center' style={{ minWidth: 30 }}>

                          {
                            row?.completed ? 

                            <span  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
										<LibraryAddCheckIcon  style={{color:'green'}}/> Yes

                            </span>
                    :

                    <span   style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

										<IndeterminateCheckBoxIcon  style={{color:'red'}}/> No
                    </span>
                          }
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</TableContainer>
							<TablePagination
								rowsPerPageOptions={[10, 25, 100]}
								component='div'
								count={AllShippment?.length}
								rowsPerPage={rowsPerPage}
								page={page}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
							/>
						</Paper>
					) : (
						<Paper
							elevation={2}
							square
							style={{ width: "100%", height: "400px", padding: "20px",display:'flex',alignItems:'center',justifyContent:'center' }}
						>
							<h3 style={{ textAlign: "center", color: "#0F2C67" }}>
								You have no shippment <Link  to='/create'>Create One </Link> !
							</h3>
						</Paper>
					)}
				</div>: <Loader/>}
			</div>
    </>
  )
}

export default CompletedShippment