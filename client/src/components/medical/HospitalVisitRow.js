import React from 'react'
import {
    TableCell,
    TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteHospital } from '../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendDelete } from './modals/modal-api/ModalServerRequest'

function HospitalVisitRow(props) {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfoReducer);

    function deleteRow(){
        const url = 'http://localhost:6000/hospital-visit/'
        sendDelete(props.visit.visitId, url, dispatch, userInfo, deleteHospital)
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
            <TableCell align="inherit">{props.visit.notes}</TableCell>
        </TableRow>
    )
}

export default HospitalVisitRow