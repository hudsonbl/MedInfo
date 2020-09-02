import React from 'react' 
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

import AllergyList from './AllergyList'
import DoctorVisitList from './DoctorVisitList'
import ChronicHealthList from './ChronicHealthList'
import HospitalVisitList from './HospitalVisitList'
import DrugPrescriptionList from './DrugPrescriptionList'
import ImmunizationRecordList from './ImmunizationRecordList'
import LabReportList from './LabReportList'
import AddMedDataByModal from './AddMedDataByModal'

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
  const [count, setCount] = React.useState(0)
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  function forceRefreshAfterAddingNewItemToList() {
    setCount(count + 1)
  }

  return (
    <div>
      <Accordion square expanded={expanded === `${props.panel}`} onChange={handleChange(`${props.panel}`)}>
        <AccordionSummary aria-controls={`${props.panel}d-content`} id={`${props.panel}d-header`}>
          <Typography>{props.panel}</Typography>
        </AccordionSummary>
        <AddMedDataByModal config={props.config} item={props.panel} refresh={forceRefreshAfterAddingNewItemToList}/>
        <AccordionDetails>
            {false ? count : ''}
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
            return (<AllergyList config={props.config}/>);
        case 'Doctor Visits':   
            return (<DoctorVisitList config={props.config}/>);
        case 'Chronic Health Issues':
            return (<ChronicHealthList config={props.config}/>);
        case 'Drug Prescriptions':      
            return (<DrugPrescriptionList config={props.config}/>);
        case 'Hospital Visits':
            return (<HospitalVisitList config={props.config}/>);
        case 'Immunization Records':
            return (<ImmunizationRecordList config={props.config}/>);
        case 'Lab Reports':           
            return (<LabReportList />);            
        default:
            return (<div></div>)
    }
}