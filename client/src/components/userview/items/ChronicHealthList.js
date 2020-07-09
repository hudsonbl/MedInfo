import React from 'react' 
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

import ChronicHealthRow from './ChronicHealthRow'
// Component: Creates the dropdown table for Chronic Health Issues
class ChronicHealthList extends React.Component {
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
        fetch(`http://localhost:6000/chronic-health/${this.props.state.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("==Data: ", data)
                this.setState({data: data.health, successStatus: data.successStatus});
            })
            .catch(error => {
                console.log("==error: ", error.errorMessage)
            });
    }

    render (){ 
        const userData = this.state.data.map(health => <ChronicHealthRow key={health.chronicId} health={health} />)
        return (
            <TableContainer component={Paper} >
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Condition</TableCell>
                        <TableCell align="left">Notes about condition</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {userData}
                </TableBody>
            </TableContainer>
        )
    }
}

export default ChronicHealthList