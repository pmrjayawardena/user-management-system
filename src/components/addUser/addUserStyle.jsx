import styled from 'styled-components';

export const UserCardContainer = styled.nav`
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 80%;
	margin: auto;
	margin-top: 3rem;
`;

export const FormContainer = styled.div`
	margin: 0 20px;
	margin-top: 2rem;

	width: 300px;
	input {
		height: 35px;
		width: 100%;
		padding-left: 6px;
		border-radius: 4px;
		border: 1px solid #01579b;
	}
	.errorClass {
		color: red;
		font-size: 12px;
		margin-top: 2px;
		font-weight: 500;
	}
`;

export const SmallLoader = styled.div`
	display: flex;
	margin-left: 10px;
	align-items: center;
	font-size: 13px;
	gap: 10px;
	justify-content: center;
`;
export const ActionButtonContainer = styled.nav`
	display: flex;
	margin-top: 2rem;
	gap: 20px;
	a {
		text-decoration: none;
		color: #000;
	}
`;

export const SubmitButton = styled.button`
	border: 1px solid #01579b;
	height: 35px;
	border-radius: 4px;
	width: 100%;
	background: #01579b;
	color: #fff;
	font-size: 11px;
	cursor: pointer;
`;
