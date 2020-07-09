import React from 'react' 
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

import ImmunizationRecordRow from './ImmunizationRecordRow'
// Component: Creates the dropdown table for Immunization Records
class ImmunizationRecordList extends React.Component {
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
        fetch(`http://localhost:6000/immunization-record/${this.props.state.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("==Data: ", data)
                this.setState({data: data.records, successStatus: data.successStatus});
            })
            .catch(error => {
                console.log("==error: ", error.errorMessage)
            });
    }

    render (){ 
        const userData = this.state.data.map(record => <ImmunizationRecordRow key={record.recordId} record={record} />)
        return (
            <TableContainer component={Paper} >
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Vaccine</TableCell>
                        <TableCell align="left">Administered By</TableCell>
                        <TableCell align="left">Date Administered</TableCell>
                        <TableCell align="left">Next Dose</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {userData}
                </TableBody>
            </TableContainer>
        )
    }
}

export default ImmunizationRecordList