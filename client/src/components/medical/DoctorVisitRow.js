import React from 'react'
import {
    TableCell,
    TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteDoctor } from '../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendDelete } from './modals/modal-api/ModalServerRequest.js'
import {doctorURL} from '../../config/configValues';
function DoctorVisitRow(props) {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfoReducer);

    function deleteRow(){
        sendDelete(props.visit.visitId, doctorURL, dispatch, userInfo, deleteDoctor)
    }

    return (
        <TableRow>
            <TableCell align="inherit">
                <IconButton onClick={() => props.handleOpen(props.visit)}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={deleteRow}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
            <TableCell align="inherit">{props.visit.date}</TableCell>
            <TableCell align="inherit">{props.visit.clinicianName}</TableCell>
            <TableCell align="inherit">{props.visit.bloodPressure}</TableCell>
            <TableCell align="inherit">{props.visit.heartRate}</TableCell>
            <TableCell align="inherit">{props.visit.notes}</TableCell>
        </TableRow>
    )
}

export default DoctorVisitRow