export const sort = (users, field, type) => {
	let fieldName = field == null ? 'first_name' : field;
	let usersArr = [...users];
	let sorted = usersArr.sort((a, b) => {
		if (a[fieldName] < b[fieldName]) {
			return -1;
		}
		if (a[fieldName] > b[fieldName]) {
			return 1;
		}
	});

	return type ? sorted : sorted.reverse();
};
