import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { resetPasswordURL } from '../../config/configValues';

const parentURL = '/';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Trademark '}
		<Link color="inherit" href={parentURL} to={parentURL}>
		  	Fast MedInfo
		</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
	  	</Typography>
	);
}
  
const useStyles = makeStyles((theme) => ({
	paper: {
	  	marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
	  	margin: theme.spacing(3, 0, 2),
	},
}));

export default function ResetPassword() {
	const classes = useStyles();
	const [ successStatus, setSuccessStatus ] = useState(true);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ reenterPassword, setReenterPassword] = useState('');
	const [ code, setCode ] = useState('');

	const userInfo = useSelector(state => state.userInfoReducer);
	const dispatch = useDispatch();

	const handleResetPassword = (event) => {
		event.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'accept': 'application/json'},
            body: JSON.stringify({
				code: code,
				email: email,
				password: password,
				reenterPassword: reenterPassword
            })
        }

        fetch(resetPasswordURL, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
					setTimeout(() => window.location.href='/login', 200);
				} else {
					setSuccessStatus(false)
				}
            })
            .catch(error => {
				setSuccessStatus(false)
                console.log(error)
            });
	}

  	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
			<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
            Reset password
			</Typography>
			{!successStatus ?   <Typography style={{align: 'center'}} component="h3" variant="h6" >
                                    Please retype a valid email.
                                </Typography> 
                            :   <Typography component="h3" variant="h6">
                                    Please enter your email, verification code and new password.
                                </Typography>
            }
			<form className={classes.form} noValidate>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email Address"
				name="email"
				autoComplete="email"
				onChange={e => setEmail(e.target.value)}
				autoFocus
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="code"
				label="Verification Code"
				name="code"
				autoComplete="code"
				onChange={e => setCode(e.target.value)}
				autoFocus
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="password"
				label="Password"
				type="password"
				name="password"
				onChange={e => setPassword(e.target.value)}
				autoFocus
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="reenterPassword"
				type="password"
				label="Re-enter Password"
				name="reenterPassword"
				onChange={e => setReenterPassword(e.target.value)}
				autoFocus
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={handleResetPassword}
			>
				{'Set Password'}
			</Button>
			</form>
		</div>
		<Box mt={8}>
			<Copyright />
		</Box>
		</Container>
	);
}
