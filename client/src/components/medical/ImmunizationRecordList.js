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
import ImmunizationRecordRow from './ImmunizationRecordRow'
import { initImmunization, initImmunizationFlag } from '../../cache/actions';
import {useDispatch, useSelector} from 'react-redux'
import ImmunizationRecordModal from './modals/ImmunizationRecordModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { sendGET } from './modals/modal-api/ModalServerRequest';
import {immunizationURL} from '../../config/configValues';


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
// Component: Creates the dropdown table for Immunization Records
const ImmunizationRecordList = (props) => {
    const [ querySuccess, checkQuery ] = useState(false)
    const initFlags = useSelector(state => state.initFlagsReducer);
    const userInfo = useSelector(state => state.userInfoReducer)
    const immunizationDataRed = useSelector(state => state.immunizationReducer)
    const dispatch = useDispatch()
    const [immunizationData, setImmunizationData] = useState([])
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
        if(!initFlags.immunizationFlag && props.config === 'user'){
            sendGET(immunizationURL, dispatch, userInfo, initImmunization, initImmunizationFlag, setImmunizationData)
        }
    }, [])

    useEffect(() => {
        setImmunizationData(immunizationDataRed)
    }, [immunizationDataRed] )

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
                        <ImmunizationRecordModal dataType={'EDIT_DATA'} handleClose={handleClose} record={newData} />
                    </Paper>
                </Fade>
            </Modal>
            <Table>                
                <TableHead>
                    <TableRow>
                        <TableCell align="inherit">Edit/Delete</TableCell>
                        <TableCell align="left">Vaccine</TableCell>
                        <TableCell align="left">Administered By</TableCell>
                        <TableCell align="left">Date Administered</TableCell>
                        <TableCell align="left">Next Dose</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for immunization record data */}
                    {immunizationData !== undefined && props.config === 'user' ? immunizationData.map(record => 
                        <ImmunizationRecordRow key={record.recordId} record={record} handleOpen={handleOpen} handleClose={handleClose}/>
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>  
    )
}

export default ImmunizationRecordList

