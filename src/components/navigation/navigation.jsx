import './navigation.css';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';

export const Navigation = () => {
	return (
		<>
			<AppBar
				component='nav'
				className='custom-header'
				style={{ background: '#01579b' }}
				position='fixed'
			>
				<Toolbar>
					<Link to={`/`}>
						<Typography
							variant='h6'
							component='div'
							sx={{
								flexGrow: 1,
								display: { sm: 'block' },
								fontSize: '15px',
							}}
						>
							User Administration System
						</Typography>
					</Link>
				</Toolbar>
			</AppBar>
			<Outlet />
		</>
	);
};
