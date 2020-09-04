import React from 'react'
import {
    TableCell,
    TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteDrug } from '../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendDelete } from './modals/modal-api/ModalServerRequest.js'
import {prescriptionURL} from '../../config/configValues';
function DrugPrescriptionRow(props) {
    
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfoReducer);

    function deleteRow(){
        sendDelete(props.prescription.prescriptionId, prescriptionURL, dispatch, userInfo, deleteDrug)
    }

    return (
        <TableRow>
            <TableCell align="inherit">
                <IconButton onClick={() => props.handleOpen(props.prescription)}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={deleteRow}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
            <TableCell align="inherit">{props.prescription.name}</TableCell>
            <TableCell align="inherit">{props.prescription.startdate}</TableCell>
            <TableCell align="inherit">{props.prescription.enddate}</TableCell>
            <TableCell align="inherit">{props.prescription.symptoms}</TableCell>
        </TableRow>
    )
}

export default DrugPrescriptionRow