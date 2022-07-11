import styled from 'styled-components';

export const UserContainer = styled.nav`
	width: 80%;
	margin: auto;
`;

export const ActionButtonContainer = styled.nav`
	display: flex;
	gap: 10px;
	justify-content: start;
	a {
		text-decoration: none;
	}
`;

export const SearchBoxContainer = styled.nav`
	display: flex;
	justify-content: flex-end;
	margin: 2rem 0;
	gap: 10px;
	align-items: center;
	flex-wrap: wrap;
`;

export const ArrowIcons = styled.div`
	display: 'flex';
	alignitems: 'center';
	justifycontent: 'start';
`;
