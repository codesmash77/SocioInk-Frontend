import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeInk, unlikeInk } from '../redux/actions/dataActions';

export class LikeButton extends Component {
  likedInk = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.inkId === this.props.inkId
      )
    )
      return true;
    else return false;
  };
  likeInk = () => {
    this.props.likeInk(this.props.inkId);
  };
  unlikeInk = () => {
    this.props.unlikeInk(this.props.inkId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedInk() ? (
      <MyButton tip="Undo like" onClick={this.unlikeInk}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeInk}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  inkId: PropTypes.string.isRequired,
  likeInk: PropTypes.func.isRequired,
  unlikeInk: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  likeInk,
  unlikeInk
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);