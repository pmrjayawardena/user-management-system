import React, { useState, useEffect } from 'react';
import Users from '../../components/users/users';
import { Pagination } from '../../components/pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	setUsersData,
	setCurrentPage,
	setMeta,
	setNewUsers,
} from '../../actions/userActions';
import Loader from '../../components/UI/loader/loader';
import { Toast } from '../../components/UI/toast/toast';
import { sort } from '../../utils/sort';
import { fetchAllUsers, deleteUser } from '../../requests/userRequest';
import { SpinnerContainer } from '../../components/UI/loader/loaderStyle';
import { HomeContainer } from './homeStyle';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { setDeletedUsers } from '../../actions/userActions';

const useNavigateSearch = () => {
	const navigate = useNavigate();
	return (pathname, params) => navigate(`${pathname}?${createSearchParams(params)}`);
};

export const Home = () => {
	const navigate = useNavigate();
	const navigateSearch = useNavigateSearch();
	const [searchParams] = useSearchParams();

	let sortType = searchParams.get('sort');
	let fieldName = searchParams.get('field');

	const dispatch = useDispatch();
	const usersData = useSelector((state) => state.user.users);
	let usersLength = usersData.length;
	const updatedUsers = useSelector((state) => state.user.updatedUsers);
	const currentPage = useSelector((state) => state.user.currentPage);
	const searchTerm = useSelector((state) => state.user.term);
	const meta = useSelector((state) => state.user.meta);
	const deletedUsers = useSelector((state) => state.user.deletedUsers);
	const newUsersData = useSelector((state) => state.user.newUsers);
	const [loading, setLoading] = useState(false);

	const getUsers = async () => {
		try {
			setLoading(true);
			let data = await fetchAllUsers(currentPage);
			const usersDataArray = data.users;
			let storefinal;
			storefinal = usersDataArray.filter((item) => {
				if (deletedUsers.length === 0) {
					return item;
				} else {
					if (!deletedUsers.includes(item.id)) {
						return item;
					}
				}
			});

			let arrCopy = storefinal.slice();
			let metaData;
			metaData = data.meta;
			if (updatedUsers.length !== 0) {
				for (let userObject of updatedUsers) {
					for (let dataObject of arrCopy) {
						if (userObject.id === dataObject.id) {
							dataObject.first_name = userObject.first_name;
							dataObject.last_name = userObject.last_name;
							dataObject.email = userObject.email;
						}
					}
				}
			}

			if (newUsersData.length !== 0) {
				metaData.total_pages = metaData.total_pages + 1;
				if (metaData.page > 2) {
					for (let newUser of newUsersData) {
						storefinal.push(newUser);
					}
				}
			}

			dispatch(setUsersData(storefinal));
			dispatch(setMeta(metaData));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			Toast('Something went wrong');
		}
	};

	useEffect(() => {
		getUsers();
	}, [currentPage]);

	const deleteUserById = async (user) => {
		let filteredUsers;
		if (newUsersData.length !== 0) {
			filteredUsers = newUsersData.filter((item) => item.id != user.id);

			dispatch(setNewUsers(filteredUsers));
		} else {
			filteredUsers = usersData.filter((item) => item.id != user.id);
		}

		const deleted = usersData.filter((item) => item.id == user.id);

		const includes = deletedUsers.includes(deleted[0].id);
		if (!includes) {
			const allDeleted = [...deletedUsers, deleted[0].id];
			dispatch(setDeletedUsers(allDeleted));
		}

		dispatch(setUsersData(filteredUsers));
		Toast(`User ${user.first_name} ${user.last_name} deleted`);
		navigate('/');
		// location.reload();

		await deleteUser(user);
	};

	var setPaginationPage = (page) => {
		dispatch(setCurrentPage(page));
	};

	const handleSort = (field, type) => {
		navigateSearch('', {
			term: searchTerm,
			sort: type ? 'desc' : 'asc',
			field: field,
		});
	};

	let filterdData = usersData.filter((item) => {
		if (searchTerm !== '') {
			if (
				item.first_name.toLowerCase().match(searchTerm?.toLowerCase()) ||
				item.last_name.toLowerCase().match(searchTerm?.toLowerCase()) ||
				item.email.toLowerCase().match(searchTerm?.toLowerCase())
			) {
				return item;
			}
		} else {
			return item;
		}
	});

	const sorted = sort(filterdData, fieldName, sortType == 'desc' ? 1 : 0);

	const slicedUsers = sorted.slice(0, 6);
	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<Loader />
				</SpinnerContainer>
			) : (
				<HomeContainer>
					<Users
						users={slicedUsers ? slicedUsers : []}
						deleteUser={deleteUserById}
						handleSort={handleSort}
					/>

					{!searchTerm && (
						<Pagination
							totalUsers={usersData.length}
							paginate={setPaginationPage}
							pageNumber={currentPage}
							totalPages={meta.total_pages}
						/>
					)}
				</HomeContainer>
			)}
		</>
	);
};
