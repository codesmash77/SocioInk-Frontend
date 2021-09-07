const themeObject = {
	palette: {
		primary: {
			light: '#4f5b62',
			main: '#263238',
			dark: '#000a12',
			contrastText: '#fff'
		},
		secondary: {
			light: '#4f5b62',
			main: '#263238',
			dark: '#000a12',
			contrastText: '#fff'
		}
	},
	typography: {
		useNextVariants: true
	},
	form: {
		textAlign: 'center',
		width: '100%',
		marginTop: '8px'
	},
	image: {
		margin: '20px auto 20px auto'
	},
	pageTitle: {
		margin: '10px auto 10px auto'
	},
	textField: {
		margin: '10px auto 10px auto'
	},
	button: {
		marginTop: 20,
		position: 'relative'
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10
	},
	progress: {
		position: 'absolute'
	},
	invisibleSeparator: {
		border: 'none',
		margin: 4
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px solid rgba(0,0,0,0.1)',
		marginBottom: 20
	},
	paper: {
		padding: 40,
		marginTop: '64px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '70%'
			}
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%'
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: '#00bcd4'
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		}
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px'
		}
	},
	submit: {
		margin: '24px 0px 16px'
	},
	avatar: {
		alignItems: 'center',
		margin: '0px',
		backgroundColor: '#263238'
	},
	handle: {
		height: 20,
		backgroundColor: '#263238',
		width: 60,
		margin: '0 auto 7px auto'
	},
};

export default themeObject;
