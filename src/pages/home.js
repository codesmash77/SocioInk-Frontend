import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Ink from '../components/Ink';
import Profile from '../components/Profile';

import { connect } from 'react-redux';
import { getInks } from '../redux/actions/dataActions';

class home extends Component {
	state = {
		inks: null
	};
	componentDidMount() {
		axios
			.get('/Inks')
			.then((res) => {
				this.setState({
					inks: res.data
				});
			})
			.catch((err) => console.log(err));
	}
	render() {
		let recentInksMarkup = this.state.inks 
		? this.state.inks.map((ink) => <Ink key={ink.inkId} ink={ink}/>) 
		: <p>Loading...</p>;
		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{recentInksMarkup}
				</Grid>
				<Grid item sm={4} xs={12}>
					<Profile/>
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
  getInks: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getInks }
)(home);
