import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import AllergyList from './items/AllergyList';
import DoctorVisitList from './items/DoctorVisitList';
import ChronicHealthList from './items/ChronicHealthList';
import DrugPrescriptionList from './items/DrugPrescriptionList';
import HospitalVisitList from './items/HospitalVisitList';
import ImmunizationRecordList from './items/ImmunizationRecordList';
import LabReportList from './items/LabReportList';
import TransitionModal from './TransitionModal'


// Component: Acts as the outer DOM component for each Med Info Item. 
function MedInfoItem(props) {
    
    return (
        <div className='data-items'>
          {CustomizedAccordions(props)}
        </div>
    )
}

export default MedInfoItem

// Function: helps selects med info item based on what the user clicked
function selectInfoItem(props){
    switch (props.panel) {
        case 'Allergies':
            console.log("Panel: ", props.panel);
            return (<AllergyList state={props.state}/>);
        case 'Doctor Visits':
            console.log("Panel: ", props.panel);
            return (<DoctorVisitList state={props.state}/>);
        case 'Chronic Health Issues':
            console.log("Panel: ", props.panel);
            return (<ChronicHealthList state={props.state}/>);
        case 'Drug Prescriptions':
            console.log("Panel: ", props.panel);
            return (<DrugPrescriptionList state={props.state}/>);
        case 'Hospital Visits':
            console.log("Panel: ", props.panel);
            return (<HospitalVisitList state={props.state}/>);
        case 'Immunization Records':
            console.log("Panel: ", props.panel);
            return (<ImmunizationRecordList state={props.state}/>);
        case 'Lab Reports':
            console.log("Panel: ", props.panel);
            return (<LabReportList state={props.state}/>);
            
        default:
            console.log("error");
    }
}
const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

function CustomizedAccordions(props) {
  const [expanded, setExpanded] = React.useState(props.panel);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            {props.panel}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {TransitionModal(props)}
          </div>
         
          {selectInfoItem(props)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}