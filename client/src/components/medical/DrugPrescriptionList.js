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
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import DrugPrescriptionModal from './modals/DrugPrescriptionModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import DrugPrescriptionRow from './DrugPrescriptionRow'
import {initDrug, initDrugFlag} from '../../cache/actions'
import { sendGET } from './modals/modal-api/ModalServerRequest';
import {prescriptionURL} from '../../config/configValues';

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

// Component: Creates the dropdown table for Drug Prescriptions
const DrugPrescriptionList = (props) => {
    // const [ querySuccess, checkQuery ] = useState(false)
    const initFlags = useSelector(state => state.initFlagsReducer);
    const userInfo = useSelector(state => state.userInfoReducer)
    const prescriptionDataRed = useSelector(state => state.prescriptionReducer)
    const dispatch = useDispatch()
    const [prescriptionData, setPrescriptionData] = useState([])
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
        if(!initFlags.drugFlag && props.config === 'user'){
            sendGET(prescriptionURL, dispatch, userInfo, initDrug, initDrugFlag, setPrescriptionData)
        }
    }, [])

    useEffect(() => {
        setPrescriptionData(prescriptionDataRed)
    }, [prescriptionDataRed])

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
                        <DrugPrescriptionModal dataType={'EDIT_DATA'} handleClose={handleClose} prescription={newData} />
                    </Paper>
                </Fade>
            </Modal>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="inherit">Edit/Delete</TableCell>
                        <TableCell align="left">Drug Name</TableCell>
                        <TableCell align="left">Started Using</TableCell>
                        <TableCell align="left">Stopped Using</TableCell>
                        <TableCell align="left">Symptoms</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for prescription data */}
                    {prescriptionData !== undefined && props.config === 'user' ? prescriptionData.map(prescription => 
                        <DrugPrescriptionRow key={prescription.prescriptionId} prescription={prescription} handleOpen={handleOpen} handleClose={handleClose}/>
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DrugPrescriptionList

