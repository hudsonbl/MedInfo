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

import DoctorVisitRow from './DoctorVisitRow'
import {initDoctor} from '../../cache/actions'
import {useSelector, useDispatch} from 'react-redux'

// Component: Creates the dropdown table for Doctor Visits
const DoctorVisitList = () => {
    const [ querySuccess, checkQuery ] = useState(false)

    const userInfo = useSelector(state => state.userInfoReducer)
    const doctorData = useSelector(state => state.doctorReducer)
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

        fetch(`http://localhost:6000/doctor-visit/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    dispatch(initDoctor(data.visits))
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
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Dr Visited</TableCell>
                        <TableCell align="left">Blood Pressure</TableCell>
                        <TableCell align="left">Heart Rate</TableCell>
                        <TableCell align="left">Notes From Visit</TableCell>
                        </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for doctor visit data */}
                    {doctorData !== undefined ? doctorData.map(visit => 
                        <DoctorVisitRow key={visit.visitId} visit={visit} />
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DoctorVisitList

