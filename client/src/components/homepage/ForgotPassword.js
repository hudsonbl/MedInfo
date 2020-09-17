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
import { forgotPasswordURL } from '../../config/configValues';

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
		marginTop: theme.spacing(1),
	},
	submit: {
	  	margin: theme.spacing(3, 0, 2),
	},
}));

export default function ForgotPassword() {
	const classes = useStyles();
    const [ email, setEmail ] = useState('');
    const [successStatus, setSuccessStatus] = useState(true);

	const requestForgottenPasswordEmail = (event) => {
		event.preventDefault()

        const requestOptions = {
			mode: 'cors',
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'accept': 'application/json',
					  'Access-Control-Allow-Origin': '*'},
            body: JSON.stringify({
              email: email
            })
        }

        fetch(forgotPasswordURL, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    setTimeout(() => window.location.href='/reset-password', 200);
				} else {
                    setSuccessStatus(false)
                }
            })
            .catch(error => {
                console.log(error)
                setSuccessStatus(false)
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
                                    Please enter your email address to request a password reset.
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
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={requestForgottenPasswordEmail}
			>
				{'Send Email'}
			</Button>
			</form>
		</div>
		<Box mt={8}>
			<Copyright />
		</Box>
		</Container>
	);
}
