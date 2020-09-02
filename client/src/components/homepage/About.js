import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import img1 from './photos/qrcode.PNG'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import MedInfoDashboard from '../userpage/MedInfoDashboard';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        flexDirection: 'column',
        position: 'flex',
    },
    imageSrc: {
        height:'500px',
        width: '100%',
		backgroundSize: 'cover',
		backgroundPosition: 'center ',
    }
}))

const About = () => {
    const classes = useStyles()
    return (
        <Grid className={classes.root} component="section">
            <Typography variant="h3" marked="center" align="center" component="h2">
                About Fast MedInfo
            </Typography>
            <Typography style={{margin: '10px'}} variant="h5" marked="center" align="center" component="h5">
                Track your information
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Track your allergy history, doctor visits, chronic health issues. Create notes about symptoms regarding 
                prescriptions you’ve taken. Have your immunization records available. 
		    </Typography>
            <Grid >
                <Grid item xs={12}>
                    <MedInfoDashboard config="about"/>
                </Grid>
            </Grid>
            <Typography style={{margin: '20px'}} variant="h5" marked="center" align="center" component="h5">
                First Responder
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Each user is given a unique QR code. This can be printed out and used for emergency situations. With a quick scan from the camera on your phone. You can share your
            allergy history instantly. 
            Keep it in your wallet or purse. Sharing allergy information can help first responders diagnose and treat you safely if you’re in an emergency situation. 
		    </Typography>
            <Grid >
                <Grid item xs={12} align="center">
                    <Paper style={{ height: '525px', width: '406px', backgroundImage: `url(${img1})`, backgroundPosition: 'center', backgroundSize: 'cover'}}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default About