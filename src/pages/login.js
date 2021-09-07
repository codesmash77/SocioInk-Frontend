/* eslint-disable */
import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import themeObject from '../util/theme';

const theme = createTheme(themeObject);
import Container from '@material-ui/core/Container';
import logo from '../images/logo.png';
import Copyright from '../util/copyright';

//Redux imports
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';


class login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		this.props.loginUser(userData, this.props.history);
	};

	render() {
		const { classes, UI: { loading } } = this.props;
		const { errors } = this.state;

		return (
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className="paper" align="center">
						<Avatar className="avatar">
							<img src={logo} />
						</Avatar>
						<Typography component="h1" variant="h5" color="primary" align="center">
							SocioInk℠
						</Typography>
						<form className="form" noValidate onSubmit={this.handleSubmit}>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="email"
								value={this.state.email}
								helperText={!this.state.email ? 'Must not be empty' : ''}
								error={this.state.email ? false : true}
								onChange={this.handleChange}
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								value={this.state.password}
								helperText={!this.state.password ? 'Must not be empty' : ''}
								error={this.state.password ? false : true}
								onChange={this.handleChange}
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							{errors.general && (
								<Typography variant="body2" className="customError" color="error">
									{errors.general}
								</Typography>
							)}
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								disabled={loading}
								className="submit"
							>
								Sign In &nbsp;{loading && (
									<CircularProgress size={22} color="primary" className="progress" />
								)}
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link component={RouterLink} to="/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
					<Box mt={8}>
						<Copyright />
					</Box>
				</Container>
			</ThemeProvider>
		);
	}
}

login.propTypes = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

const mapActionsToProps = {
	loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(login);
