/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
// MUI
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import themeObject from './theme';
import '../components/Ink.css';

const theme = createTheme(themeObject);

const ProfileSkeleton = () => {

	return (
		<ThemeProvider theme={theme}>
			<Paper className="paper">
				<div className="profile">
					<div className="image-wrapper">
						<img
							src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
							alt="profile"
							className="profileimage"
						/>
					</div>
					<hr />
					<div className="profile-details">
						<div className="handle" />
						<hr />
						<div className="fullLine" />
						<div className="fullLine" />
						<hr />
						<LocationOn color="primary" /> <span>Location</span>
						<hr />
						<LinkIcon color="primary" /> https://website.com
						<hr />
						<CalendarToday color="primary" /> Joined date
					</div>
				</div>
			</Paper>
		</ThemeProvider>
	);
};

ProfileSkeleton.propTypes = {
	classes: PropTypes.object.isRequired
};

export default ProfileSkeleton;
