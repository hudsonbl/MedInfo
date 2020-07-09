import React from 'react';
import AllergyRow from '../userview/items/AllergyRow';
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

class FirstResponder extends React.Component { 
    constructor(){
        super()
        this.state={
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
                'accept': 'application/json'
            }
        }

        fetch(`http://localhost:6000/first-responder/${this.props.match.params.userId}`, requestOptions)
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

    render() {
        const userData = this.state.data.map(allergy => <AllergyRow key={allergy.allergyId} allergy={allergy} />)
        return (
            <div>
                <h1>User: {this.props.match.params.userId}</h1>
                <TableContainer component={Paper} >
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
            </div>
            
        )
    }
}

export default FirstResponder