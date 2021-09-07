import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Ink from '../components/Ink';
import StaticProfile from '../components/StaticProfile';
import Grid from '@material-ui/core/Grid';

import InkSkeleton from '../util/InkSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import '../components/Ink.css';

class user extends Component {
  state = {
    profile: null,
    inkIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const inkId = this.props.match.params.inkId;

    if (inkId) this.setState({ inkIdParam: inkId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { inks, loading } = this.props.data;
    const { inkIdParam } = this.state;

    const inksMarkup = loading ? (
      <InkSkeleton />
    ) : inks === null ? (
      <p>No inks from this user</p>
    ) : !inkIdParam ? (
      inks.map((ink) => <Ink key={ink.inkId} ink={ink} />)
    ) : (
      inks.map((ink) => {
        if (ink.inkId !== inkIdParam)
          return <Ink key={ink.inkId} ink={ink} />;
        else return <Ink key={ink.inkId} ink={ink} openDialog />;
      })
    );

    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {inksMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserData }
)(user);