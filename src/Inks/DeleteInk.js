import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import { connect } from 'react-redux';
import { deleteInk } from '../redux/actions/dataActions';
import '../components/Ink.css';


class DeleteInk extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteInk = () => {
    this.props.deleteInk(this.props.inkId);
    this.setState({ open: false });
  };
  render() {
    return (
      <Fragment>
        <MyButton
          tip="Delete Ink"
          onClick={this.handleOpen}
          className="deleteButton"
        >
          <DeleteOutline color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Are you sure you want to delete this ink ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteInk} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteInk.propTypes = {
  deleteInk: PropTypes.func.isRequired,
  inkId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteInk }
)(DeleteInk);