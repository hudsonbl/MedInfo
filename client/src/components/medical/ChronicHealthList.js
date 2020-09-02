import React , {useState, useEffect } from 'react' 
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Table,
    Paper
} from '@material-ui/core';

import ChronicHealthRow from './ChronicHealthRow'
import {useSelector, useDispatch} from 'react-redux'
import { initChronic, initChronicFlag } from '../../cache/actions';
import ChronicHealthModal from './modals/ChronicHealthModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

// Component: Creates the dropdown table for Chronic Health Issues
const ChronicHealthList = (props) => {
    const [ querySuccess, checkQuery ] = useState(false);
    const initFlags = useSelector(state => state.initFlagsReducer);
    const userInfo = useSelector(state => state.userInfoReducer);
    const chronicDataRed = useSelector(state => state.chronicReducer);
    const dispatch = useDispatch();
    const [chronicData, setChronicData] = useState([]);
    const [newData, setData] = useState([])
    const [open, setOpen] = useState(false)
    const classes = useStyles();
    const handleOpen = (data) => {
        setData(data)
        setOpen(true)
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // Only fetch data if it hasn't already
        if(!initFlags.chronicFlag && props.config === 'user'){
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.bearerToken}`,
                    'accept': 'application/json'
                }
            }
    
            fetch(`http://localhost:6000/chronic-health/${userInfo.userId}`, requestOptions)
                .then(async response => {
                    const data = await response.json();
    
                    if(!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    
                    if(data.successStatus){
                        console.log("==Data: ", data)
                        dispatch(initChronic(data.health))
                        dispatch(initChronicFlag())
                        setChronicData(data.health)
                    }
                })
                .catch(error => {
                    console.log("==error: ", error.errorMessage)
                });
        }
    }, [])

    useEffect(() => {
        setChronicData(chronicDataRed)
    }, [chronicDataRed])

    return (
        <TableContainer component={Paper} >
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
              timeout: 500,
              }}
            >
                <Fade in={open}>
                    <Paper className={classes.paper}>
                        <ChronicHealthModal dataType={'EDIT_DATA'} handleClose={handleClose} health={newData} />
                    </Paper>
                </Fade>
            </Modal>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="inherit">Edit/Delete</TableCell>
                        <TableCell align="left">Condition</TableCell>
                        <TableCell align="left">Notes about condition</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chronicData !== undefined && props.config === 'user' ? chronicData.map(health => 
                        <ChronicHealthRow key={health.chronicId} health={health} handleOpen={handleOpen} handleClose={handleClose}/> 
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ChronicHealthList