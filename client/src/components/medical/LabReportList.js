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
import { initLab } from '../../cache/actions';
import {useDispatch, useSelector} from 'react-redux'
import LabReportRow from './LabReportRow'

// TODO: This will deal with file types in the future. User may request to access or download a file ex: pdf, x-ray.jpg what ever
// Component: Creates the dropdown table for Lab Reports    
const LabReportList = () => {
    const [ querySuccess, checkQuery ] = useState(false)

    const userInfo = useSelector(state => state.userInfoReducer)
    const labReportData = useSelector(state => state.labReportReducer)
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

        fetch(`http://localhost:6000/lab-reports/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    console.log("==Data: ", data)
                    dispatch(initLab(data.labReports))
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
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for lab report data */}
                    {labReportData !== undefined ? labReportData.map(report => 
                        <LabReportRow key={report.reportId} report={report} />
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>  
    )
}

export default LabReportList