import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Loader from '../UI/loader/loader';
import { Toast } from '../UI/toast/toast';
import { ToastContainer } from 'react-toastify';
import { updateUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import Stack from '@mui/material/Stack';
import { setNewUsers, setUpdatedUsers } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
	UserCardContainer,
	SubmitButton,
	FormContainer,
	SmallLoader,
	ActionButtonContainer,
	CancelButton,
} from './editUserStyle';
import { useForm } from 'react-hook-form';

export const EditUser = () => {
	let { id } = useParams();
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	const updatedUsers = useSelector((state) => state.user.updatedUsers);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [updating, setUpdating] = useState(false);
	const newUsersData = useSelector((state) => state.user.newUsers);
	const [defaultValues, setDefaultValues] = useState({});
	const getUser = async () => {
		setLoading(true);
		let singleUser = usersData.filter((user) => user.id == parseInt(id));
		setUser(singleUser[0]);
		setLoading(false);
		reset({
			Firstname: singleUser[0].first_name,
			Lastname: singleUser[0].last_name,
			Email: singleUser[0].email,
		});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: defaultValues,
	});

	const onSubmit = async (formData) => {
		if (newUsersData.length !== 0) {
			for (let upUser of newUsersData) {
				if (upUser.id === parseInt(id)) {
					upUser.first_name = formData.Firstname;
					upUser.last_name = formData.Lastname;
					upUser.email = formData.Email;
					dispatch(setNewUsers([upUser]));
				}
			}
		}
		setUpdating(true);
		const data = await updateUser(
			{
				first_name: formData.Firstname,
				last_name: formData.Lastname,
				email: formData.Email,
			},
			id
		);
		const updated = usersData.filter((item) => item.id == parseInt(id));

		if (updatedUsers.length === 0) {
			const allUpdated = [
				...updatedUsers,
				{
					id: parseInt(id),
					first_name: formData.Firstname,
					last_name: formData.Lastname,
					email: formData.Email,
				},
			];
			dispatch(setUpdatedUsers(allUpdated));
		} else {
			for (let upUser of updatedUsers) {
				if (upUser.id === parseInt(id)) {
					upUser.first_name = formData.Firstname;
					upUser.last_name = formData.Lastname;
					upUser.email = formData.Email;
					dispatch(setUpdatedUsers([upUser]));
				} else {
					const allUpdated = [
						{ ...upUser },
						{
							id: parseInt(id),
							first_name: formData.Firstname,
							last_name: formData.Lastname,
							email: formData.Email,
						},
					];
					dispatch(setUpdatedUsers(allUpdated));
				}
			}
		}

		setUpdating(false);

		Toast('Updated Successfully');
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		updateUserData();
	};

	const handleNavigation = () => {
		navigate('/');
	};
	useEffect(() => {
		getUser();
	}, [id]);

	return loading ? (
		<SpinnerContainer>
			<Loader />
		</SpinnerContainer>
	) : (
		<>
			<ToastContainer
				position='bottom-right'
				autoClose={100}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				limit={1}
			/>
			<div
				style={{ position: 'absolute', top: '80px', left: '20px', width: '80px' }}
			>
				<CancelButton
					variant='outlined'
					size='medium'
					type='submit'
					className='submit-btn'
					onClick={handleNavigation}
				>
					BACK
				</CancelButton>
			</div>
			<UserCardContainer>
				<h3 style={{ color: '#1976d2' }}>Update User</h3>
				<Card sx={{ maxWidth: 345 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
							style={{ height: '200px', width: '100%' }}
						/>
					</CardActionArea>
				</Card>
				<FormContainer>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack direction='column' spacing={1} alignItems='center'>
							<input
								type='text'
								placeholder='Firstname'
								ref={register}
								{...register('Firstname', {
									required: true,
									minLength: 3,
								})}
							/>
							{errors.Firstname && (
								<p className='errorClass'>Firstname is required</p>
							)}
							<input
								type='text'
								placeholder='Lastname'
								ref={register}
								{...register('Lastname', {
									required: true,
									minLength: 3,
								})}
							/>
							{errors.Lastname?.type === 'required' && (
								<p className='errorClass'>Lastname is required</p>
							)}
							{errors.Lastname?.type === 'minLength' && (
								<p className='errorClass'>
									Minimum length should be greater than 3
								</p>
							)}
							<input
								type='text'
								placeholder='Email'
								ref={register}
								{...register('Email', {
									required: true,
									pattern:
										/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
								})}
							/>
							{errors.Email?.type === 'required' && (
								<p className='errorClass'>Email is required</p>
							)}
							{errors.Email?.type === 'pattern' && (
								<p className='errorClass'>Valid Email is required</p>
							)}
							<ActionButtonContainer>
								<CancelButton
									variant='outlined'
									size='medium'
									type='submit'
									className='submit-btn'
									onClick={handleNavigation}
								>
									CANCEL
								</CancelButton>
								<SubmitButton
									variant='contained'
									size='small'
									type='submit'
									disableElevation
									className='submit-btn'
								>
									{updating ? (
										<SmallLoader>
											<Loader size={20} />
										</SmallLoader>
									) : (
										'UPDATE'
									)}
								</SubmitButton>
							</ActionButtonContainer>
						</Stack>
					</form>
				</FormContainer>
			</UserCardContainer>
		</>
	);
};
