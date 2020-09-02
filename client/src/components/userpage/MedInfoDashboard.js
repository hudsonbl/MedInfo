import React from 'react' 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MedInfoItem from '../medical/MedInfoItem'

const MedInfoDashboard = (props) => {

    return (
        <Grid container spacing={3}>
			{/* Contains all drop down boxes for Med info items that are tracked per user */}
			<Grid item xs={12}>
				<Paper>
					<MedInfoItem panel={'Allergies'} config={props.config}/>
					<MedInfoItem panel={'Doctor Visits'} config={props.config}/>
					<MedInfoItem panel={'Chronic Health Issues'} config={props.config}/>
					<MedInfoItem panel={'Drug Prescriptions'} config={props.config}/>
					<MedInfoItem panel={'Hospital Visits'} config={props.config}/>
					<MedInfoItem panel={'Immunization Records'} config={props.config}/>
					{/* Took out lab reports as of 8/24/2020 <MedInfoItem panel={'Lab Reports'} /> */}
				</Paper>
			</Grid>
		</Grid>
    ) 
}

export default MedInfoDashboard