import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Loader from '../UI/loader/loader';
import { ToastContainer } from 'react-toastify';
import { SpinnerContainer } from '../UI/loader/loaderStyle';
import { UserCardContainer } from './singleUserStyle';
import { useSelector } from 'react-redux';

export const SingleUser = ({ id }) => {
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const usersData = useSelector((state) => state.user.users);
	const getUser = async () => {
		setLoading(true);
		let singleUser = usersData.filter((user) => user.id == parseInt(id));
		setLoading(false);
		setUser(singleUser[0]);
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
			<UserCardContainer style={{ margin: '0 20px' }}>
				<Card sx={{ maxWidth: 600 }}>
					<CardActionArea>
						<CardMedia
							component='img'
							image={user.avatar}
							alt={user.first_name}
							style={{ height: '200px', width: '100%' }}
						/>
						<CardContent>
							<p className='cus-title'>
								<span className='title-span'>Firstname:</span>
								{user.first_name}
							</p>
							<p className='cus-title'>
								<span className='title-span'>Lastname:</span>
								{user.last_name}
							</p>
							<p className='cus-title'>
								<span className='title-span'>Email:</span>
								{user.email}
							</p>
						</CardContent>
					</CardActionArea>
				</Card>
			</UserCardContainer>
		</>
	);
};
