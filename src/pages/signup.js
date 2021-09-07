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
import { signupUser } from '../redux/actions/userActions';

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
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
		this.setState({
			loading: true
		});
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle
		};
		this.props.signupUser(newUserData, this.props.history);
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
								id="handle"
								value={this.state.handle}
								helperText={!this.state.handle ? 'Must not be empty' : ''}
								error={this.state.handle ? false : true}
								onChange={this.handleChange}
								label="User Handle"
								name="handle"
								autoFocus
							/>
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
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								value={this.state.confirmPassword}
								helperText={!this.state.confirmPassword ? 'Must not be empty' : ''}
								error={this.state.confirmPassword ? false : true}
								onChange={this.handleChange}
								type="password"
								id="confirmPassword"
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
								Sign Up &nbsp;{loading && (
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
									<Link component={RouterLink} to="/login" variant="body2">
										{'Have an account already? Sign In'}
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

signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(signup);
