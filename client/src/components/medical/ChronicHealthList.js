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

import ChronicHealthRow from './ChronicHealthRow'
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux'
import { initChronic } from '../../cache/actions';
// Component: Creates the dropdown table for Chronic Health Issues
const ChronicHealthList = () => {
    const [ querySuccess, checkQuery ] = useState(false)

    const userInfo = useSelector(state => state.userInfoReducer)
    const chronicData = useSelector(state => state.chronicReducer)
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

        fetch(`http://localhost:6000/chronic-health/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log("==Data: ", data)
                if(data.successStatus){
                    dispatch(initChronic(data.health))
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
                        <TableCell align="left">Condition</TableCell>
                        <TableCell align="left">Notes about condition</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {chronicData !== undefined ? chronicData.map(health => 
                        <ChronicHealthRow key={health.chronicId} health={health} /> 
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ChronicHealthList