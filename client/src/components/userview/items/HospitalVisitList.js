import React from 'react' 
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

import HospitalVisitRow from './HospitalVisitRow'
// Component: Creates the dropdown table for Hospital Visits
class HospitalVisitList extends React.Component {
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
        fetch(`http://localhost:6000/hospital-visit/${this.props.state.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("==Data: ", data)
                this.setState({data: data.visits, successStatus: data.successStatus});
            })
            .catch(error => {
                console.log("==error: ", error.errorMessage)
            });
    }

    render (){ 
        const userData = this.state.data.map(visit => <HospitalVisitRow key={visit.visitId} visit={visit} />)
        return (
            <TableContainer component={Paper} >
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Available Doctor</TableCell>
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

export default HospitalVisitList