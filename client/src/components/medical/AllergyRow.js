import React from 'react'
import {
    TableCell,
    TableRow,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAllergy } from '../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendDelete } from './modals/modal-api/ModalServerRequest.js'
import {allergyURL} from '../../config/configValues';

function AllergyRow(props) {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfoReducer);

    function deleteRow(){
        sendDelete(props.allergy.allergyId, allergyURL, dispatch, userInfo, deleteAllergy)
    }

    return (
        <TableRow>
            <TableCell align="inherit">
                <IconButton onClick={() => props.handleOpen(props.allergy)}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={deleteRow}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
            <TableCell align="inherit">{props.allergy.allergy}</TableCell>
            <TableCell align="inherit">{props.allergy.medication}</TableCell>
            <TableCell align="inherit">{props.allergy.symptoms}</TableCell>
        </TableRow>
    )
}

export default AllergyRow