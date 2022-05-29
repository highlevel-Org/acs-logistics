import React, { useState, useEffect, useRef } from "react";

import { useReactToPrint } from "react-to-print";
import Pdf from "react-to-pdf";
// import { DownloadTableExcel,useDownloadExcel  } from 'react-export-table-to-excel';

// import ReactExport from "react-data-export";
// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
import ContentLoader, { Facebook } from "react-content-loader";

import { useDispatch, useSelector } from "react-redux";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GridOnIcon from "@mui/icons-material/GridOn";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import Header from "../../components/PageHeader/Header";
import Loader from "../../components/Loader/Loader";
import { userSelector } from "../../Store/userFeatures";
import {
	shippmentSelector,
	getAllShippment,
	removeShippment,
} from "../../Store/shippingFeature";

//Style imports
import "./AllShippment.css";

const columns = [
	"S/N",
	"PACKAGE",
	"SENDER",
	"RCEIVER",
	"DATE SHIPPED",
	"DELIVERY DATE",
	"ACTIONS",
];

function AllShippment() {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const dispatch = useDispatch();

	const { user } = useSelector(userSelector);
	const { IsLoading, AllShippment, IsDeleted } = useSelector(shippmentSelector);
	const userToken = user?.token;
	const userId = user?.data?._doc?._id;

	// console.log()

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function HandleDelete(packageId) {
		// console.log(packageId);
		dispatch(removeShippment({ userToken, packageId }));
	}

	const printRef = useRef();

	//handle print function
	const handlePrint = useReactToPrint({
		content: () => printRef.current,
	});

	// const { onDownload } = useDownloadExcel({
    //     currentTableRef: printRef.current,
    //     filename: 'Users table',
    //     sheet: 'Users'
    // })

	// Handle table to excell

	// const ExcelData = [
	// 	{
	// 		columns: [
	// 			{
	// 				title: "S/N",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wpx: 125 },
	// 			},
	// 			{
	// 				title: "PACKAGE NAME",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wpx: 125 },
	// 			},
	// 			{
	// 				title: "SENDER",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wpx: 125 },
	// 			},
	// 			{
	// 				title: "RECEIVER",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wpx: 125 },
	// 			},
	// 			{
	// 				title: "DATE SHIPPED",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wpx: 125 },
	// 			},
	// 			{
	// 				title: "DELIVERY DATE",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wpx: 125 },
	// 			},
	// 			// {
	// 			// 	title: "DATE REGISTERED",
	// 			// 	style: { font: { sz: "14", bold: true } },
	// 			// 	width: { wpx: 125 },
	// 			// },
	// 		],
	// 		data: [...AllShippment]
	// 		.reverse().map((row, i) => [
	// 			{ value: i + 1, style: { font: { sz: "12" } } },
	// 			{ value: row.packageName, style: { font: { sz: "12" } } },
	// 			{
	// 				value: row?.origin?.senderName ? row?.origin?.senderName : "Nil",
	// 				style: { font: { sz: "12" } },
	// 			},
	// 			{
	// 				value: row?.destination?.receiverName
	// 					? row?.destination?.receiverName
	// 					: "Nil",
	// 				style: { font: { sz: "12" } },
	// 			},
	// 			{ value:  new Date(row.createdAt).toDateString(), style: { font: { sz: "12" } } },
			
	// 			{
	// 				value: new Date(row.deliveryDate).toDateString(),
	// 				style: { font: { sz: "12" } },
	// 			},
	// 		]),
	// 	},
	// ];

	// function to sort the table by date

	// function SortTable() {
	// 	AllShippment.sort((a,b)=>{

	// 	})
	// }

	useEffect(() => {
		dispatch(getAllShippment({ userToken, userId }));
	}, []);

	// console.log(user);

	const pdfOption = {
		orientation: "landscape",
		unit: "mm",
		format: [210, 297],
	};

	// console.log([...AllShippment].reverse())
	return (
		<>
			<Header title='All Shippment' />
			<div className='pageWrapper'>
				{!IsLoading ? (
					<div className='shippmentList'>
						<Paper sx={{ width: "100%", padding: "2px" }}>
							<Stack direction='row' justifyContent='end' m={2} spacing={1}>
								<Button
									size='small'
									variant='contained'
									endIcon={<LocalPrintshopIcon style={{color:'white'}}/>}
									onClick={handlePrint}
								>
									Print
								</Button>

								<Pdf
									targetRef={printRef}
									scale={1}
									options={pdfOption}
									filename={`ACS all Shippment ${new Date().toLocaleDateString()}`}
								>
									{({ toPdf }) => (
										<Button
											endIcon={<PictureAsPdfIcon style={{color:'white'}}/>}
											size='small'
											color='danger'
											variant='contained'
											onClick={toPdf}
										>
											PDF
										</Button>
									)}
								</Pdf>
								{/* <Button
								endIcon={<PictureAsPdfIcon />}
								size='small'
								color='danger'
								variant='contained'
							>
								PDF
							</Button> */}
							
								{/* <ExcelFile
											filename={`AllShippment ${new Date().toLocaleDateString()}`}
											element={
												<Button
									size='small'
									color='secondary'
									variant='contained'
									endIcon={<GridOnIcon />}
								>
									Excel
								</Button>
											}
										>
											<ExcelSheet dataSet={ExcelData} name='Exc' />
										</ExcelFile>
							 */}
				
							 {/* <Button
									size='small'
									color='secondary'
									variant='contained'
									endIcon={<GridOnIcon />}
									onClick={onDownload}
								>
									Excel
								</Button> */}
					
							</Stack>
						</Paper>
						{AllShippment.length > 0 ? (
							<Paper sx={{ width: "100%" }}>
								<TableContainer ref={printRef} sx={{ maxHeight: 600 }}>
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
											{[...AllShippment]
												.reverse()
												?.slice(
													page * rowsPerPage,
													page * rowsPerPage + rowsPerPage
												)
												.map((row, idx) => {
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
																{new Date(
																	row?.deliveryDate
																).toLocaleDateString()}
															</TableCell>
															<TableCell
																align='center'
																style={{ minWidth: 30 }}
															>
																<div className='actionIcons'>
																	<Tooltip
																		title='View'
																		arrow
																		placement='top-end'
																	>
																		<Link to={`/shippments/${row?._id}`}>
																			<VisibilityIcon
																				className='actionIcon'
																				color='primary'
																			/>
																		</Link>
																	</Tooltip>
																	{/* <Tooltip title='Edit' arrow placement='top-end'>
																<SaveAsIcon
																	className='actionIcon'
																	color='primary'
																/>
															</Tooltip> */}
																	<Tooltip
																		title='Delete'
																		arrow
																		placement='top-end'
																	>
																		<DeleteForeverIcon
																			className='actionIcon'
																			color='danger'
																			onClick={() => HandleDelete(row._id)}
																		/>
																	</Tooltip>
																</div>
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
								style={{
									width: "100%",
									height: "400px",
									padding: "20px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<h3 style={{ textAlign: "center", color: "#0F2C67" }}>
									You have no shippment <Link to='/create'>Create One </Link> !
								</h3>
							</Paper>
						)}
					</div>
				) : (
					<Loader />
				)}
			</div>
		</>
	);
}

export default AllShippment;
