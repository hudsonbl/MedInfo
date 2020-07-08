import React from 'react'
import {
    TableCell,
    TableRow,
} from '@material-ui/core';

function ImmunizationRecordRow(props) {
    return (
        <TableRow>
            <TableCell align="inherit">{props.record.vaccine}</TableCell>
            <TableCell align="inherit">{props.record.administeredBy}</TableCell>
            <TableCell align="inherit">{props.record.dateGiven}</TableCell>
            <TableCell align="inherit">{props.record.nextDose}</TableCell>
        </TableRow>
    )
}

export default ImmunizationRecordRow