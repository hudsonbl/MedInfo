import React , {useState, useEffect } from 'react';
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
import AllergyRow from './AllergyRow';
import {initAllergy, initAllergyFlag} from '../../cache/actions';
import {useSelector, useDispatch} from 'react-redux'
import AllergyModal from './modals/AllergyModal';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { sendGET } from './modals/modal-api/ModalServerRequest';
import {allergyURL} from '../../config/configValues';

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

const AllergyList = (props) => { 
    const [ querySuccess, checkQuery ] = useState(false);
    const userInfo = useSelector(state => state.userInfoReducer);
    const allergyDataRed = useSelector(state => state.allergyReducer);
    const initFlags = useSelector(state => state.initFlagsReducer);
    const dispatch = useDispatch();
    const [allergyData, setAllergyData] = useState([])
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
        if(!initFlags.allergyFlag && props.config === 'user'){
            sendGET(allergyURL, dispatch, userInfo, initAllergy, initAllergyFlag, setAllergyData)
        }
    }, []);

    useEffect(() => {
        setAllergyData(allergyDataRed)
    }, [allergyDataRed])

    return (
        <TableContainer component={Paper}>
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
                        <AllergyModal dataType={'EDIT_DATA'} handleClose={handleClose} allergy={newData} />
                    </Paper>
                </Fade>
            </Modal>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="inherit">Edit/Delete</TableCell>
                        <TableCell align="inherit">Allergy</TableCell>
                        <TableCell align="inherit">Medication</TableCell>
                        <TableCell align="inherit">Symptoms</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for allergy data */}
                    {allergyData !== undefined && props.config === 'user' ? allergyData.map(allergy => 
                        <AllergyRow key={allergy.allergyId} allergy={allergy} handleOpen={handleOpen} handleClose={handleClose}/>
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default AllergyList
