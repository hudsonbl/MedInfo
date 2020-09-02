import React, {useState} from 'react'
import {
    TableCell,
    TableRow,
    Container
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteAllergy } from '../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendDelete } from './modals/modal-api/ModalServerRequest'


function AllergyRow(props) {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.userInfoReducer);

    function deleteRow(){
        const url = 'http://localhost:6000/allergies/'
        sendDelete(props.allergy.allergyId, url, dispatch, userInfo, deleteAllergy)
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