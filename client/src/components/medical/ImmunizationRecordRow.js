import React from 'react'
import {
    TableCell,
    TableRow,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteImmunization } from '../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendDelete } from './modals/modal-api/ModalServerRequest.js'
import {immunizationURL} from '../../config/configValues';
function ImmunizationRecordRow(props) {

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfoReducer);

    function deleteRow(){
        sendDelete(props.record.recordId, immunizationURL, dispatch, userInfo, deleteImmunization)
    }

    return (
        <TableRow>
            <TableCell align="inherit">
                <IconButton onClick={() => props.handleOpen(props.record)}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={deleteRow}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
            <TableCell align="inherit">{props.record.vaccine}</TableCell>
            <TableCell align="inherit">{props.record.administeredBy}</TableCell>
            <TableCell align="inherit">{props.record.dateGiven}</TableCell>
            <TableCell align="inherit">{props.record.nextDose}</TableCell>
        </TableRow>
    )
}

export default ImmunizationRecordRow