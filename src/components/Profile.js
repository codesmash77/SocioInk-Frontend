/* eslint-disable */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import themeObject from '../util/theme';
import './Ink.css';

import EditDetails from './EditDetails';
import MyButton from '../util/MyButton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions';

const theme = createTheme(themeObject);

class Profile extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		if (event.target.files[0]) console.log('yes');
		this.props.uploadImage(formData);
	};

	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};

	handleLogout = () => {
		this.props.logoutUser();
	};

	render() {
		const {
			user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading, authenticated }
		} = this.props;
		let ProfileMarkUp = !loading ? authenticated ? (
			<Paper className="paper">
				<div className="profile">
					<div className="image-wrapper">
						<img src={imageUrl} alt="profile" className="profileimage" />
						<MyButton tip="Edit profile picture"  btnClassName="button">
							<input type="file" id="imageInput"  display="none" onChange={this.handleImageChange} />
							<EditIcon color="primary" />
						</MyButton>
					</div>
					<hr />
					<div className="profile-details">
						<MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
							@{handle}
						</MuiLink>
						<hr />
						{bio && (
							<Typography variant="body1" align="justify" className="bio">
								{bio}
							</Typography>
						)}
						<hr />
						{location && (
							<Fragment>
								<LocationOn color="primary" />{' '}
								<span>
									{'   '}
									{location}
								</span>
								<hr />
							</Fragment>
						)}
						{website && (
							<Fragment>
								<LinkIcon color="primary" />
								<a href={website} target="_blank" rel="noopener noreferrer">
									{'   '}
									{website}
								</a>
								<hr />
							</Fragment>
						)}
						<CalendarToday color="primary" />{' '}
						<span>
							Joined {'   '}
							{dayjs(createdAt).format('MMM YYYY')}
						</span>
					</div>
					<MyButton tip="Logout" onClick={this.handleLogout}>
						<KeyboardReturn color="primary" />
					</MyButton>
					<EditDetails />
				</div>
			</Paper>
		) : (
			<Paper className="paper">
				<Typography variant="body2" align="center">
					No profile found, please login again
				</Typography>
				<div className="buttons">
					<Button variant="contained" color="primary" component={Link} to="/login">
						Login
					</Button>
					<Button variant="contained" color="secondary" component={Link} to="/signup">
						Signup
					</Button>
				</div>
			</Paper>
		) : (
			<Fragment>
				<ProfileSkeleton />
				<MyButton tip="Log In" onClick={this.handleLogout}>
					<KeyboardReturn color="primary" />
				</MyButton>
			</Fragment>
		);

		return <ThemeProvider theme={theme}>{ProfileMarkUp}</ThemeProvider>;
	}
}

const mapStateToProps = (state) => ({
	user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	uploadImage: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
