import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import img1 from './photos/Capture.JPG'
import img2 from './photos/work1.jpg'
import img3 from './photos/work2.jpg'
import img4 from './photos/work3.jpg'
import img5 from './photos/qrcode.PNG'
import img6 from './photos/work4.jpg'

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(4),
	},
	images: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexWrap: 'wrap',
	},
	imageWrapper: {
		position: 'relative',
		display: 'block',
		padding: 0,
		borderRadius: 0,
		height: '40vh',
		[theme.breakpoints.down('sm')]: {
		width: '100% !important',
		height: 100,
		},
		'&:hover': {
		zIndex: 1,
		},
		'&:hover $imageBackdrop': {
		opacity: 0.15,
		},
		'&:hover $imageMarked': {
		opacity: 0,
		},
		'&:hover $imageTitle': {
		border: '4px solid currentColor',
		},
	},
	imageButton: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: theme.palette.common.white,
	},
	imageSrc: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundSize: 'cover',
		backgroundPosition: 'center 40%',
	},
	imageBackdrop: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		background: theme.palette.common.black,
		opacity: 0.5,
		transition: theme.transitions.create('opacity'),
	},
	imageTitle: {
		position: 'relative',
		padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
	},
	imageMarked: {
		height: 3,
		width: 18,
		background: theme.palette.common.white,
		position: 'absolute',
		bottom: -2,
		left: 'calc(50% - 9px)',
		transition: theme.transitions.create('opacity'),
	},
}));

function WelcomScreen(){
	return (
		<>
			<ProductCategories />
		</>
	)
}

export default WelcomScreen

function ProductCategories() {
	const classes = useStyles();

	const images = [
		{
			url: img1,
			title: 'Track Your Information',
			width: '40%',
		},
		{
			url: img2,
			title: 'Consult Doctors',
			width: '20%',
		},
		{
			url: img3,
			title: 'Know Your Symptom History',
			width: '40%',
		},
		{
			url: img4,
			title: 'Secure Data',
			width: '38%',
		},
		{
			url: img5,
			title: 'User ID',
			width: '20%',
		},
		{
			url: img6,
			title: 'Have information ready for new doctors',
			width: '42%',
		},
	];

	return (
		<Container className={classes.root} component="section">
		<Typography variant="h4" marked="center" align="center" component="h2">
			Welcome to Fast MedInfo
		</Typography>
		<Typography variant="h5" align="center" color="textSecondary" paragraph>
			Keep track of your medical history. Make it available when you need it. Whether it be allergies, recalling past doctor visits, prescriptions, immunization records. 
			With Fast MedInfo, you can visit new or recurring doctors and have medical information ready for them to review.
		</Typography>
		<div className={classes.images}>
			{images.map((image) => (
			<ButtonBase
				href='/about'
				key={image.title}
				className={classes.imageWrapper}
				style={{
				width: image.width,
				}}
			>
				<div
					className={classes.imageSrc}
					style={{
						backgroundImage: `url(${image.url})`,
					}}
				/>
				<div className={classes.imageBackdrop} />
				<div className={classes.imageButton}>
				<Typography
					component="h3"
					variant="h6"
					color="inherit"
					className={classes.imageTitle}
				>
					{image.title}
					<div className={classes.imageMarked} />
				</Typography>
				</div>
			</ButtonBase>
			))}
		</div>
		</Container>
	);
}

ProductCategories.propTypes = {
classes: PropTypes.object.isRequired,
};