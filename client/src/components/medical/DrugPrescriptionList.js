import React , {useState, useEffect } from 'react' 
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Table,
    Paper
} from '@material-ui/core';

import DrugPrescriptionRow from './DrugPrescriptionRow'
import {initDrug} from '../../cache/actions'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios';
// Component: Creates the dropdown table for Drug Prescriptions
const DrugPrescriptionList = () => {
    const [ querySuccess, checkQuery ] = useState(false)

    const userInfo = useSelector(state => state.userInfoReducer)
    const prescriptionData = useSelector(state => state.prescriptionReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.bearerToken}`,
                'accept': 'application/json'
            }
        }

        fetch(`http://localhost:6000/drug-prescription/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    console.log("==Data: ", data)
                    dispatch(initDrug(data.prescriptions))
                }
            })
            .catch(error => {
                console.log("==error: ", error.errorMessage)
            });
    }, [])

    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Drug Name</TableCell>
                        <TableCell align="left">Started Using</TableCell>
                        <TableCell align="left">Stopped Using</TableCell>
                        <TableCell align="left">Symptoms</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for prescription data */}
                    {prescriptionData !== undefined ? prescriptionData.map(prescription => 
                        <DrugPrescriptionRow key={prescription.prescriptionId} prescription={prescription} />
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DrugPrescriptionList

