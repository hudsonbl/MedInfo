import React from 'react'
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Paper
} from '@material-ui/core';

function ChronicHealthRow(props) {
    return (
        <TableRow>
            <TableCell align="inherit">{props.health.condition}</TableCell>
            <TableCell align="inherit">{props.health.notes}</TableCell>
        </TableRow>
    )
}

export default ChronicHealthRow