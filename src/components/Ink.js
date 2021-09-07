/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Ink.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteInk from '../Inks/DeleteInk';
import InkDialog from '../Inks/InkDialog';
import LikeButton from '../Inks/LikeButton';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import EditIcon from '@material-ui/icons/Edit';
// Redux
import { connect } from 'react-redux';
import { uploadInkImage } from '../redux/actions/dataActions';

class Ink extends Component {
	handleImageChange = (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append('image', image, image.name);
		if(this.props.ink.inkId)
		this.props.uploadInkImage(formData,this.props.ink.inkId);
		else console.log("no inkid");
	};

	handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	};
	render() {
		dayjs.extend(relativeTime);
		const {
			ink: { body, createdAt, userHandle, userImage, inkImage, inkId, likeCount, commentCount },
			user: { credentials: { handle } , authenticated},
		} = this.props;

		const deleteButton = authenticated && userHandle === handle ? <DeleteInk inkId={inkId} /> : null;

		return (
			<Card className="card">
				<CardHeader
					avatar={<Avatar alt={userHandle} src={userImage} className="avatar" />}
					title={<a className="handle">{userHandle}</a>}
					subheader={dayjs(createdAt).fromNow()}
					component={Link}
					to={`/users/${userHandle}`}
				>
					{userHandle}
				</CardHeader>
				{deleteButton}
				<CardMedia image={inkImage} title="Ink Image" className="inkImage" />
				<MyButton tip="Edit Ink picture"  btnClassName="button">
					<input type="file" id="imageInput" onChange={this.handleImageChange} />
					<EditIcon color="primary" />
				</MyButton>
				<CardContent>
					<Typography variant="body1" className="content">
						{body}
					</Typography>
					<LikeButton inkId={inkId} />
					<span>{likeCount} Likes</span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
					<InkDialog inkId={inkId} userHandle={userHandle} openDialog={this.props.openDialog} />
				</CardContent>
			</Card>
		);
	}
}

Ink.propTypes = {
	user: PropTypes.object.isRequired,
	ink: PropTypes.object.isRequired,
	openDialog: PropTypes.bool
};

const mapActionsToProps = { uploadInkImage };


const mapStateToProps = (state) => ({
	uploadInkImage: PropTypes.func.isRequired,
	user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(Ink);
