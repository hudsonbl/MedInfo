import React , { useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { addHospital, editHospital } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendEdit, sendNewData } from './modal-api/ModalServerRequest';
import {hospitalURL} from '../../../config/configValues';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const HospitalVisitModal = (props) => {
    const [ edit, setEdit ] = useState(false)
    // const [ querySuccess, checkQuery ] = useState(false)
    const [ date, setDate ] = useState('')
    const [ clinicianName, setClinicianName ] = useState('')
    const [ notes, setNotes ] = useState('')
    const [ today, setToday ] = useState('')
    
    const classes = useStyles()

    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.dataType === 'EDIT_DATA'){
            setEdit(true)
            // Set modal values to be able to modify current values
            setDate(props.visit.date)
            setClinicianName(props.visit.clinicianName)
            setNotes(props.visit.notes)
        }

        var d = new Date()
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = d.getFullYear();

        setToday(mm + '-' + dd + '-' + yyyy)
    }, [])

    const addNewData = (event) => {
        event.preventDefault()
        
        if(props.dataType === 'EDIT_DATA'){
            const body = {
                visitId: props.visit.visitId,
                date: date,
                clinicianName: clinicianName,
                notes: notes
            }
            sendEdit(body, hospitalURL, props, dispatch, userInfo, editHospital)
        }else if(props.dataType === 'NEW_DATA'){
            const body = {
                date: date,
                clinicianName: clinicianName,
                notes: notes
            }
            sendNewData(body, hospitalURL, props, dispatch, userInfo, addHospital)
        }   
    }

    return (
        <Container>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        name="date"
                        onChange={e => setDate(e.target.value)}
                        id="date"
                        label="Date Visited"
                        type="date"
                        defaultValue={edit ? props.visit.date : today}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        name="clinicianName"
                        onChange={e => setClinicianName(e.target.value)}
                        id="outlined-textarea"
                        label="Doctor Visited"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.visit.clinicianName : ''}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="notes"
                        onChange={e => setNotes(e.target.value)}
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        defaultValue={edit ? props.visit.notes : ''}
                        inputProps={{ maxLength: 255 }}
                    />
                </div>
                <Button variant="contained" color="primary" onClick={addNewData}>
                    Add
                </Button>
            </form>
        </Container>
    )
}

export default HospitalVisitModal