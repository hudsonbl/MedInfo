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

import DoctorVisitRow from './DoctorVisitRow'
import {initDoctor, initDoctorFlag} from '../../cache/actions'
import {useSelector, useDispatch} from 'react-redux'
import DoctorVisitModal from './modals/DoctorVisitModal'
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

// Component: Creates the dropdown table for Doctor Visits
const DoctorVisitList = (props) => {
    const [ querySuccess, checkQuery ] = useState(false)
    const initFlags = useSelector(state => state.initFlagsReducer);
    const userInfo = useSelector(state => state.userInfoReducer)
    const doctorDataRed = useSelector(state => state.doctorReducer)
    const dispatch = useDispatch() 
    const [doctorData, setDoctorData] = useState([])
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
        if(!initFlags.doctorFlag && props.config === 'user'){
            const requestOptions = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userInfo.bearerToken}`,
                    'accept': 'application/json'
                }
            }

            fetch(`http://localhost:6000/doctor-visit/${userInfo.userId}`, requestOptions)
                .then(async response => {
                    const data = await response.json();

                    if(!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    if(data.successStatus){
                        dispatch(initDoctor(data.visits))
                        dispatch(initDoctorFlag())
                        setDoctorData(data.visits)
                    }
                })
                .catch(error => {
                    console.log("==error: ", error.errorMessage)
                });
        }
    }, [])

    useEffect(() => { 
        setDoctorData(doctorDataRed)
    }, [doctorDataRed])

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
                        <DoctorVisitModal dataType={'EDIT_DATA'} handleClose={handleClose} visit={newData} />
                    </Paper>
                </Fade>
            </Modal>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="inherit">Edit/Delete</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Dr Visited</TableCell>
                        <TableCell align="left">Blood Pressure</TableCell>
                        <TableCell align="left">Heart Rate</TableCell>
                        <TableCell align="left">Notes From Visit</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for doctor visit data */}
                    {doctorData !== undefined && props.config === 'user' ? doctorData.map(visit => 
                        <DoctorVisitRow key={visit.visitId} visit={visit} handleOpen={handleOpen} handleClose={handleClose} />
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DoctorVisitList

