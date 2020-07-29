import React , {useState, useEffect } from 'react' 
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import AllergyList from './AllergyList'
import DoctorVisitList from './DoctorVisitList'
import ChronicHealthList from './ChronicHealthList'
import HospitalVisitList from './HospitalVisitList'
import DrugPrescriptionList from './DrugPrescriptionList'
import ImmunizationRecordList from './ImmunizationRecordList'
import LabReportList from './LabReportList'
    
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

export default function MedInfoItem(props) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded === `${props.panel}`} onChange={handleChange(`${props.panel}`)}>
        <AccordionSummary aria-controls={`${props.panel}d-content`} id={`${props.panel}d-header`}>
          <Typography>{props.panel}</Typography>
          
        </AccordionSummary>
        <AccordionDetails>
            {selectInfoItem(props)}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

// Function: helps selects med info item based on what the user clicked
function selectInfoItem(props){
    switch (props.panel) {
        case 'Allergies':
            console.log("Panel: ", props.panel);
            return (<AllergyList />);
        case 'Doctor Visits':
            console.log("Panel: ", props.panel);
            return (<DoctorVisitList />);
        case 'Chronic Health Issues':
            console.log("Panel: ", props.panel);
            return (<ChronicHealthList />);
        case 'Drug Prescriptions':
            console.log("Panel: ", props.panel);
            return (<DrugPrescriptionList />);
        case 'Hospital Visits':
            console.log("Panel: ", props.panel);
            return (<HospitalVisitList />);
        case 'Immunization Records':
            console.log("Panel: ", props.panel);
            return (<ImmunizationRecordList />);
        case 'Lab Reports':
            console.log("Panel: ", props.panel);
            return (<LabReportList />);
            
        default:
            console.log("error");
    }
}