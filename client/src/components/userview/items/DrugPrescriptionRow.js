import React from 'react'
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

function DrugPrescriptionRow(props) {
    return (
        <TableRow>
            <TableCell align="inherit">{props.prescription.name}</TableCell>
            <TableCell align="inherit">{props.prescription.startdate}</TableCell>
            <TableCell align="inherit">{props.prescription.enddate}</TableCell>
            <TableCell align="inherit">{props.prescription.symptoms}</TableCell>
        </TableRow>
    )
}

export default DrugPrescriptionRow