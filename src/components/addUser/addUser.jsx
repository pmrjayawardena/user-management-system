import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../UI/loader/loader';
import { Toast } from '../UI/toast/toast';
import { ToastContainer } from 'react-toastify';
import { addAUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import { useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import { setNewUsers } from '../../actions/userActions';
import {
	UserCardContainer,
	SubmitButton,
	FormContainer,
	SmallLoader,
	ActionButtonContainer,
	CancelButton,
} from './addUserStyle';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
export const AddUser = () => {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const [adding, setAdding] = useState(false);
	const newUsersData = useSelector((state) => state.user.newUsers);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const addUserData = async (formData) => {
		let randomId = parseInt(Math.random() * (20 - 6) + 6, 10);

		setAdding(true);
		const data = await addAUser({
			first_name: formData.Firstname,
			last_name: formData.Lastname,
			email: formData.Email,
		});
		setAdding(false);

		dispatch(
			setNewUsers([
				...newUsersData,
				{
					id: randomId,
					avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
					first_name: formData.Firstname,
					last_name: formData.Lastname,
					email: formData.Email,
				},
			])
		);
		Toast('User Added Successfully');

		navigate('/');
	};

	const handleNavigation = () => {
		navigate('/');
	};

	return (
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
				<Stack direction='row' spacing={2} alignItems='center'>
					<h3 style={{ color: '#1976d2' }}> Add New User</h3>
				</Stack>
				<FormContainer>
					<form onSubmit={handleSubmit(addUserData)}>
						<Stack direction='column' spacing={1} alignItems='center'>
							<input
								type='text'
								placeholder='Firstname'
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
								{...register('Email', {
									required: true,
									pattern: /^\S+@\S+$/i,
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
									variant='outlined'
									size='medium'
									type='submit'
									className='submit-btn'
								>
									{adding ? (
										<SmallLoader>
											<Loader size={20} />
										</SmallLoader>
									) : (
										'ADD'
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
