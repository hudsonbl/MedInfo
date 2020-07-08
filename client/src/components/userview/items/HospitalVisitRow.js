import React from 'react'
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

function HospitalVisitRow(props) {
    return (
        <TableRow>
            <TableCell align="inherit">{props.visit.date}</TableCell>
            <TableCell align="inherit">{props.visit.clinicianName}</TableCell>
            <TableCell align="inherit">{props.visit.notes}</TableCell>
        </TableRow>
    )
}

export default HospitalVisitRow