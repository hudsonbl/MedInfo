import React, {useState, useEffect, useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import QRDownloadModal from './QRDownloadModal'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { addProfileImage } from '../../cache/actions';
import {useReactToPrint} from 'react-to-print';

const useStyles = makeStyles({
    root: {
        width: 400,
        margin: 'auto'
    },
    media: {
        height: 400,
        width: '100%',
        objectFit: 'cover'
    },
    profilePiece: {
        margin: 15
    },
});

const Profile = () => {
    const classes = useStyles()
    const [open, handleOpen] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    const componentRef = useRef()

    const dispatch = useDispatch()
    const userProfile = useSelector(state => state.userProfileReducer)
    const userInfo = useSelector(state => state.userInfoReducer)

    const activatePrintScreen = (e) => {
        handleOpen(true)
    }

    const deactivatePrintScreen = (e) => {
        handleOpen(false)
    }

    const printQRCode = useReactToPrint({
        content: () => componentRef.current,
    })

    useEffect(() => {
        axios
            .get(`http://localhost:6000/users/user-info/profile/${userInfo.userId}`,
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                dispatch(addProfileImage( "data:;base64," + base64 ));
                setImageLoaded(true)
            });
    }, []);

    return (
        <Container maxWidth="lg">
            
            <Grid container spacing={6}>
                <Grid item xs={6}>
                    <Paper className={Paper}>
                        <Typography align="center" gutterBottom variant="h5" component="h2">
                            {userInfo.name}
                        </Typography>
                        <Typography style={{margin: '5px', padding: '15px'}} variant="body2" color="textSecondary" component="p">
                            Click on the QR code on the right to print it out. You can carry the QR code in your wallet or pocket. Upon allowing someone to scan your QR code, they will
                            be directed to a list of your allergies. This may be helpful when visiting a doctor. Or even showing first responders in case of an emergency.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Card className={classes.root} ref={componentRef} >
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={imageLoaded ? userProfile.image : ''}
                                title="QR-Image"
                                onClick={activatePrintScreen}
                                />
                            <QRDownloadModal handleOpen={open} handleClose={deactivatePrintScreen} printQRCode={printQRCode} />
                        </CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {userInfo.name}'s List of Allergies
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Scan this QR Code from the camera on your phone to view {userInfo.name}'s list of allergies.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>    
            </Grid>
            
        </Container>
        
    )
}
export default Profile