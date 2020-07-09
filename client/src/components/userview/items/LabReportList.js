import React from 'react' 
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

import LabReportRow from './LabReportRow'

// TODO: This will deal with file types in the future. User may request to access or download a file ex: pdf, x-ray.jpg what ever
// Component: Creates the dropdown table for Lab Reports    
class LabReportList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            successStatus: false
        }
    }
    // Query for data to back end API
    componentDidMount(){
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.state.bearerToken}`,
                'accept': 'application/json'
            }
        }
        console.log("Props: ", this.props.state.userId)
        console.log("Props: ", this.props.state)
        fetch(`http://localhost:6000/lab-reports/${this.props.state.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("==Data: ", data)
                this.setState({data: data.labReports, successStatus: data.successStatus});
            })
            .catch(error => {
                console.log("==error: ", error.errorMessage)
            });
    }

    render (){ 
        const userData = this.state.data.map(report => <LabReportRow key={report.reportId} report={report} />)
        return (
            <TableContainer component={Paper} >
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {userData}
                </TableBody>
            </TableContainer>
        )
    }
}

export default LabReportList