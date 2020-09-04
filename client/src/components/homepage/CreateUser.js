import React , {useState } from 'react' 
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import validator from 'email-validator'
import Popover from '@material-ui/core/Popover';
import {createUserURL} from '../../config/configValues'

const parentURL = '/';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Trademark '}
		<Link color="inherit" href={parentURL} to={parentURL}>
		  	FastMedInfo
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
	const classes = useStyles();
	const [confirmation, setConfirmation] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [retypeInfo, setRetypeInfo] = useState(false)
	const [anchorEl, setAnchorEl] = React.useState(null)

	const resendVerificationEmail = (event) => {
		registerAccount(event)
	}

	const handleClose = () => {
		setAnchorEl(null);
		setRetypeInfo(false)
	  };

	const registerAccount = (event) => {
		event.preventDefault()
		
        // Request Body
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'accept': 'application/json'},
            body: JSON.stringify({
              name: firstName + ' ' + lastName,
              email: email,
			  password: password,
			  isResend: confirmation
            })
		}
		
		// Only send request to server if email is a valid email.
		if(validator.validate(email)){
			// POST request to server to create a new user
			fetch(`${createUserURL}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                // If successful, successStatus == true
                if(data.successStatus){
					setConfirmation(true)
					setRetypeInfo(false)
				} 
            })
            .catch(error => {
				console.log(error)
				setRetypeInfo(true)
            });
		} else {
			setRetypeInfo(true)
		}
    }

	return (
		<Container component="main" maxWidth="xs">
		<CssBaseline />
		<div className={classes.paper}>
			<Avatar className={classes.avatar}>
			<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
			Sign up
			</Typography>
			{confirmation ? <div><Typography component="h3" variant="h5">
								Please go to your email and verify your account!
							</Typography> 
							<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							onClick={resendVerificationEmail}
							className={classes.submit}
						>
							Resend Verification Email
						</Button> </div> : <div>
			<form className={classes.form} noValidate>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
				<TextField
					autoComplete="fname"
					name="firstName"
					variant="outlined"
					required
					fullWidth
					id="firstName"
					label="First Name"
					onChange={e => setFirstName(e.target.value)}
					autoFocus
				/>
				</Grid>
				<Grid item xs={12} sm={6}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="lastName"
					label="Last Name"
					name="lastName"
					onChange={e => setLastName(e.target.value)}
					autoComplete="lname"
				/>
				</Grid>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					onChange={e => setEmail(e.target.value)}
					autoComplete="email"
				/>
				</Grid>
				<Grid item xs={12}>
				<TextField
					variant="outlined"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					onChange={e => setPassword(e.target.value)}
					autoComplete="current-password"
				/>
				</Grid>
			</Grid>
			<Popover
				open={retypeInfo}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center',
				}}
				transformOrigin={{
				vertical: 'top',
				horizontal: 'center',
				}}
			>
				<Typography variant="h6" >Some information is missing or invalid.</Typography>
			</Popover>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				onClick={registerAccount}
				className={classes.submit}
			>
				Sign Up
			</Button>
			
			<Grid container justify="flex-end">
				<Grid item>
				<Link to= "/login" href="/login" variant="body2">
					Already have an account? Sign in
				</Link>
				</Grid>
			</Grid>
			</form>
			</div>
			}
		</div>
		<Box mt={5}>
			<Copyright />
		</Box>
		</Container>
	);
}

export default SignUp