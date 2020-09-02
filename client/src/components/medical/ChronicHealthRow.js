import React from 'react'
import {
    TableCell,
    TableRow
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteChronic } from '../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendDelete } from './modals/modal-api/ModalServerRequest'

function ChronicHealthRow(props) {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfoReducer);

    function deleteRow(){
        const url = 'http://localhost:6000/chronic-health/'
        sendDelete(props.health.chronicId, url, dispatch, userInfo, deleteChronic)
    }

    return (
        <TableRow>
            <TableCell align="inherit">
                <IconButton onClick={() => props.handleOpen(props.health)}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={deleteRow}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
            <TableCell align="inherit">{props.health.condition}</TableCell>
            <TableCell align="inherit">{props.health.notes}</TableCell>
        </TableRow>
    )
}

export default ChronicHealthRow