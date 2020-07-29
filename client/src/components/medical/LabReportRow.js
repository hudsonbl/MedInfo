import React from 'react'
import {
    TableCell,
    TableRow
} from '@material-ui/core';
// Component: Inserts rows of data into drop down list
function LabreportRow(props) {
    return (
        <TableRow>
            <TableCell align="inherit">{props.report.name}</TableCell>
            <TableCell align="inherit">{props.report.notes}</TableCell>
        </TableRow>
    )
}

export default LabreportRow