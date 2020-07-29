import React, { useState, useEffect } from 'react';
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Table,
    Paper
} from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import HospitalVisitRow from './HospitalVisitRow';
import { initHospital } from '../../cache/actions';
import axios from 'axios';
// Component: Creates the dropdown table for Hospital Visits
const HospitalVisitList = () => {
    const [ querySuccess, checkQuery ] = useState(false);

    const userInfo = useSelector(state => state.userInfoReducer);
    const hospitalVisitData = useSelector(state => state.hospitalReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.bearerToken}`,
                'accept': 'application/json'
            }
        }
        
        fetch(`http://localhost:6000/hospital-visit/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    console.log("==Data: ", data)
                    dispatch(initHospital(data.visits))
                }
            })
            .catch(error => {
                console.log("==error: ", error.errorMessage)
            });
    }, []);

    return (
        <TableContainer component={Paper} >
            <Table>                
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Available Doctor</TableCell>
                        <TableCell align="left">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for hospital visit data */}
                    {hospitalVisitData !== undefined ? hospitalVisitData.map(visit => 
                        <HospitalVisitRow key={visit.visitId} visit={visit} />
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>  
    )
};

export default HospitalVisitList

