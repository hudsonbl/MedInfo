import React from 'react'
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

function AllergyRow(props) {
    return (
        <TableRow>
            <TableCell align="inherit">{props.allergy.allergy}</TableCell>
            <TableCell align="inherit">{props.allergy.medication}</TableCell>
            <TableCell align="inherit">{props.allergy.symptoms}</TableCell>
        </TableRow>
    )
}

export default AllergyRow