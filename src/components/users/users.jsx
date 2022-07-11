import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import { Link, useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { ToastContainer } from 'react-toastify';
import { UserContainer, SearchBoxContainer, ActionButtonContainer } from './userStyle';
import { NoResults } from '../noResults/noResults';
import { CustomButton } from '../UI/button/button';
import { SingleUser } from '../singleUser/singleUser';
import { useDispatch, useSelector } from 'react-redux';
import { setTerm } from '../../actions/userActions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.info.dark,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const useNavigateSearch = () => {
	const navigate = useNavigate();
	return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
};
const Users = ({ users, deleteUser, handleSort }) => {
	const navigateSearch = useNavigateSearch();
	const [searchParams] = useSearchParams();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [user, setUser] = useState('');
	const [userView, setUserView] = useState(false);
	const [order, setOrder] = useState(false);
	const [arrowLastName, setArrowLastName] = useState(false);
	const [arrowFirstName, setArrowFirstName] = useState(false);
	const [arrowEmail, setArrowEmail] = useState(false);
	const searchTerm = useSelector((state) => state.user.term);

	let sortType = searchParams.get('sort');
	let fieldName = searchParams.get('field');

	const handleSetSearch = (e) => {
		dispatch(setTerm(e.target.value));

		if (e.target.value == '') {
			navigateSearch('');
		} else {
			navigateSearch('', {
				term: e.target.value,
				sort: sortType,
				field: fieldName,
			});
		}
	};

	const handleClickOpen = (user) => {
		setOpen(true);
		setUser(user);
	};
	const handleViewUser = (user) => {
		setUserView(true);
		setUser(user);
	};

	const handleViewClose = () => {
		setUserView(false);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = () => {
		deleteUser(user);
		setOpen(false);
	};

	const changeArrows = (colName) => {
		if (colName == 'first_name') setArrowFirstName(!arrowFirstName);
		if (colName == 'last_name') setArrowLastName(!arrowLastName);
		if (colName == 'email') setArrowEmail(!arrowEmail);

		setOrder(!order);
		handleSort(colName, order);
	};

	return (
		<UserContainer>
			<>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<p style={{ padding: '0px 20px' }}>
						{`Are you sure you want to delete ${user.first_name} ${user.last_name}?`}
					</p>

					<DialogActions>
						<CustomButton
							color='info'
							variant='contained'
							disableElevation
							size='small'
							handleOnClick={() => handleClose()}
						>
							Cancel
						</CustomButton>

						<CustomButton
							color='error'
							variant='contained'
							disableElevation
							size='small'
							handleOnClick={() => handleDelete()}
						>
							Delete
						</CustomButton>
					</DialogActions>
				</Dialog>
			</>

			<>
				<Dialog
					open={userView}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'
				>
					<SingleUser id={user.id} />

					<DialogActions>
						<CustomButton
							color='info'
							variant='contained'
							disableElevation
							size='small'
							handleOnClick={() => handleViewClose()}
						>
							Cancel
						</CustomButton>
					</DialogActions>
				</Dialog>
			</>
			<ToastContainer
				position='bottom-right'
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				autoClose={100}
			/>
			<SearchBoxContainer>
				<TextField
					color='primary'
					focused
					id='outlined-search'
					label='Search'
					placeholder='Search by Firstname,Lastname and Email'
					type='search'
					onChange={(e) => handleSetSearch(e)}
					size='small'
					value={searchTerm}
					sm={{
						fontSize: '15px',
						width: '100%',
					}}
				/>
				<Link to={`/user/add`} style={{ textDecoration: 'none' }}>
					<CustomButton
						variant='contained'
						disableElevation
						size='large'
						color='primary'
					>
						Add
					</CustomButton>
				</Link>
			</SearchBoxContainer>
			<TableContainer component={Paper} sx={{ maxHeight: 300 }}>
				<Table stickyHeader aria-label='simple table'>
					<TableHead>
						<TableRow>
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell
								align='left'
								onClick={() => changeArrows('first_name')}
								style={{
									cursor: 'pointer',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
									}}
								>
									Firstname
									{fieldName == 'first_name' ? (
										!arrowFirstName && sortType == 'desc' ? (
											<ArrowDropUp />
										) : (
											<ArrowDropDown />
										)
									) : (
										''
									)}
								</div>
							</StyledTableCell>
							<StyledTableCell
								align='left'
								onClick={() => changeArrows('last_name')}
								style={{ cursor: 'pointer' }}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
									}}
								>
									Lastname
									{fieldName == 'last_name' ? (
										!arrowLastName && sortType == 'desc' ? (
											<ArrowDropUp />
										) : (
											<ArrowDropDown />
										)
									) : (
										''
									)}
								</div>
							</StyledTableCell>
							<StyledTableCell
								align='left'
								onClick={() => changeArrows('email')}
								style={{ cursor: 'pointer' }}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'start',
									}}
								>
									Email
									{fieldName == 'email' ? (
										!arrowEmail && sortType == 'desc' ? (
											<ArrowDropUp />
										) : (
											<ArrowDropDown />
										)
									) : (
										''
									)}
								</div>
							</StyledTableCell>
							<StyledTableCell align='left'>Actions</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.length == 0 ? (
							<tr>
								<td colSpan='4'>
									<NoResults />
								</td>
							</tr>
						) : (
							users.map((user) => (
								<TableRow
									key={user.id}
									sx={{
										'&:last-child td, &:last-child th': {
											border: 0,
										},
									}}
								>
									<TableCell component='th' scope='row' align='left'>
										{user.id}
									</TableCell>
									<TableCell align='left'>{user.first_name}</TableCell>
									<TableCell align='left'>{user.last_name}</TableCell>
									<TableCell align='left'>
										<a href={`mailto:${user.email}`}>{user.email}</a>
									</TableCell>
									<TableCell align='left'>
										<ActionButtonContainer>
											<CustomButton
												color='info'
												variant='contained'
												disableElevation
												size='small'
												handleOnClick={() => handleViewUser(user)}
											>
												View
											</CustomButton>
											<Link to={`/user/${user.id}`}>
												<CustomButton
													variant='contained'
													disableElevation
													size='small'
													color='primary'
												>
													Edit
												</CustomButton>
											</Link>

											<CustomButton
												color='error'
												variant='contained'
												disableElevation
												size='small'
												handleOnClick={() =>
													handleClickOpen(user)
												}
											>
												DELETE
											</CustomButton>
										</ActionButtonContainer>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</UserContainer>
	);
};

export default Users;
