import React from 'react' 
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

import AllergyRow from './AllergyRow'
// Component: Creates the dropdown table for allergies
class AllergyList extends React.Component {
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
        fetch(`http://localhost:6000/allergies/${this.props.state.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("==Data: ", data)
                this.setState({data: data.allergies, successStatus: data.successStatus});
            })
            .catch(error => {
                console.log("==error: ", error.errorMessage)
            });
    }

    render (){ 
        const userData = this.state.data.map(allergy => <AllergyRow key={allergy.allergyId} allergy={allergy} />)
        return (
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Allergy</TableCell>
                        <TableCell align="left">Medication</TableCell>
                        <TableCell align="left">Symptoms</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {userData}
                </TableBody>
            </TableContainer>
        )
    }
}

export default AllergyList