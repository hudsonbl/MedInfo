import React, { useState, useEffect } from 'react';
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Table,
    Paper
} from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import HospitalVisitRow from './HospitalVisitRow';
import { initHospital, initHospitalFlag } from '../../cache/actions';
import { makeStyles } from '@material-ui/core/styles';
import HospitalVisitModal from './modals/HospitalVisitModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { sendGET } from './modals/modal-api/ModalServerRequest';
import {hospitalURL} from '../../config/configValues';

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
// Component: Creates the dropdown table for Hospital Visits
const HospitalVisitList = (props) => {
    // const [ querySuccess, checkQuery ] = useState(false);
    const initFlags = useSelector(state => state.initFlagsReducer);
    const userInfo = useSelector(state => state.userInfoReducer);
    const hospitalVisitDataRed = useSelector(state => state.hospitalReducer);
    const dispatch = useDispatch();
    const [hospitalVisitData, setHospitalVisitData] = useState([])
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
        if(!initFlags.hospitalFlag && props.config === 'user'){
            sendGET(hospitalURL, dispatch, userInfo, initHospital, initHospitalFlag, setHospitalVisitData)
        }
    }, []);

    useEffect(() => {
        setHospitalVisitData(hospitalVisitDataRed)
    }, [hospitalVisitDataRed])

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
                        <HospitalVisitModal dataType={'EDIT_DATA'} handleClose={handleClose} visit={newData} />
                    </Paper>
                </Fade>
            </Modal>
            <Table>                
                <TableHead>
                    <TableRow>
                        <TableCell align="inherit">Edit/Delete</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Available Doctor</TableCell>
                        <TableCell align="left">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for hospital visit data */}
                    {hospitalVisitData !== undefined && props.config === 'user' ? hospitalVisitData.map(visit => 
                        <HospitalVisitRow key={visit.visitId} visit={visit} handleOpen={handleOpen} handleClose={handleClose}/>
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>  
    )
};

export default HospitalVisitList

