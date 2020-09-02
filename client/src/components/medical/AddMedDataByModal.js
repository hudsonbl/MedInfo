import React , { useState } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Add from '@material-ui/icons/Add';

import AllergyModal from './modals/AllergyModal'
import DoctorVisitModal from './modals/DoctorVisitModal'
import ChronicHealthModal from './modals/ChronicHealthModal'
import DrugPrescriptionModal from './modals/DrugPrescriptionModal'
import HospitalVisitModal from './modals/HospitalVisitModal'
import ImmunizationRecordModal from './modals/ImmunizationRecordModal'
import LabReportModal from './modals/LabReportModal'

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

const AddMedDataByModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => {
        if(props.config === 'user'){
            setOpen(true);
        }
    };
  
    const handleClose = () => {
      setOpen(false);
      // props.refresh calls a homebrewed function to force a re-render to show newly added item in list
      props.refresh() 
    };
  
    return (
      <div>
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <IconButton color="primary" aria-label="add" onClick={handleOpen}>
                  <Add />
              </IconButton>
              <Typography>Add New</Typography>
          </div>
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
                      {selectInfoItem(props, handleClose)}
                  </Paper>
              </Fade>
          </Modal>
      </div>
    );
}

export default AddMedDataByModal

// Function: helps selects med info item based on what the user clicked
function selectInfoItem(props, callback){
    switch (props.item) {
        case 'Allergies':
            return (<AllergyModal dataType={'NEW_DATA'} handleClose={callback} item={props.item} />);
        case 'Doctor Visits':
            return (<DoctorVisitModal dataType={'NEW_DATA'} handleClose={callback} item={props.item} />);
        case 'Chronic Health Issues':
            return (<ChronicHealthModal dataType={'NEW_DATA'} handleClose={callback} item={props.item} />);
        case 'Drug Prescriptions':
            return (<DrugPrescriptionModal dataType={'NEW_DATA'} handleClose={callback} item={props.item} />);
        case 'Hospital Visits':
            return (<HospitalVisitModal dataType={'NEW_DATA'} handleClose={callback} item={props.item} />);
        case 'Immunization Records':
            return (<ImmunizationRecordModal dataType={'NEW_DATA'} handleClose={callback} item={props.item} />);
        case 'Lab Reports':
            return (<LabReportModal dataType={'NEW_DATA'} handleClose={callback} item={props.item} />);
        default:
            
    }
}