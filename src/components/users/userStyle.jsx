import styled from 'styled-components';

export const UserContainer = styled.nav`
	width: 80%;
	margin: auto;
	margin-top: 5rem;
`;

export const ActionButtonContainer = styled.nav`
	display: flex;
	gap: 10px;
	justify-content: start;
	a {
		text-decoration: none;
	}
`;

export const SearchBoxContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 2rem 0;
	gap: 10px;
	align-items: center;

	@media only screen and (max-width: 500px) {
		justify-content: space-between;
	}
`;

export const ArrowIcons = styled.div`
	display: 'flex';
	alignitems: 'center';
	justifycontent: 'start';
`;
