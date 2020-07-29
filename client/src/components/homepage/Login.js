import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {loginUser} from '../../cache/actions';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
		<Link color="inherit" href="https://material-ui.com/">
		  	MedInfo
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

export default function SignIn() {
	const classes = useStyles();
	const [ loginSuccess, setLogin ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const userInfo = useSelector(state => state.userInfoReducer);
	const dispatch = useDispatch();

	const handleLogin = (event) => {
		event.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'accept': 'application/json'},
            body: JSON.stringify({
              email: email,
              password: password
            })
        }

        fetch(`http://localhost:6000/users/login`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
					
					const userAuth = {
						userId: data.userId,
						bearerToken: data.bearerToken,
						isLoggedIn: true
					}
					dispatch(loginUser(userAuth))
					console.log(userInfo)
					setTimeout(() => window.location.href='/user-info', 200);
				} 
            })
            .catch(error => {
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
			Sign in
			</Typography>
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
				name="password"
				label="Password"
				type="password"
				id="password"
				onChange={e => setPassword(e.target.value)}
				autoComplete="current-password"
			/>
			<FormControlLabel
				control={<Checkbox value="remember" color="primary" />}
				label="Remember me"
			/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={handleLogin}
			>
				{loginSuccess ? 'Sign In Again' : 'Sign In'}
			</Button>
			<Grid container>
				<Grid item xs>
				<Link href="#" variant="body2">
					Forgot password?
				</Link>
				</Grid>
				<Grid item>
				<Link href="#" variant="body2">
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
	);
}