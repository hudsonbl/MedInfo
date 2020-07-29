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
import axios from 'axios'
import ImmunizationRecordRow from './ImmunizationRecordRow'
import { initImmunization } from '../../cache/actions';
import {useDispatch, useSelector} from 'react-redux'
// Component: Creates the dropdown table for Immunization Records
const ImmunizationRecordList = () => {
    const [ querySuccess, checkQuery ] = useState(false)

    const userInfo = useSelector(state => state.userInfoReducer)
    const immunizationData = useSelector(state => state.immunizationReducer)
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
 
        fetch(`http://localhost:6000/immunization-record/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    console.log("==Data: ", data)
                    dispatch(initImmunization(data.records))
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
                        <TableCell align="left">Vaccine</TableCell>
                        <TableCell align="left">Administered By</TableCell>
                        <TableCell align="left">Date Administered</TableCell>
                        <TableCell align="left">Next Dose</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for immunization record data */}
                    {immunizationData !== undefined ? immunizationData.map(record => 
                        <ImmunizationRecordRow key={record.recordId} record={record} />
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>  
    )
}

export default ImmunizationRecordList

