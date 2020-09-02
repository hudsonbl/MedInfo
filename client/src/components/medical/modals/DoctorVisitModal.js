import React , { useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import {addDoctor, editDoctor} from '../../../cache/actions'
import {useDispatch, useSelector} from 'react-redux'
import { sendEdit, sendNewData } from './modal-api/ModalServerRequest';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const DoctorVisitModal = (props) => {
    const [ edit, setEdit ] = useState(false)
    const [ querySuccess, checkQuery ] = useState(false)
    const [ date, setDate ] = useState('')
    const [ clinicianName, setClinicianName ] = useState('')
    const [ notes, setNotes ] = useState('')
    const [ bloodPressure, setBloodPressure ] = useState('')
    const [ heartRate, setHeartRate ] = useState('')
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '-' + dd + '-' + yyyy;

    
    const classes = useStyles()

    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.dataType === 'EDIT_DATA'){
            setEdit(true)
            // Set modal values to be able to modify current values
            setDate(props.visit.date)
            setClinicianName(props.visit.setClinicianName)
            setNotes(props.visit.setClinicianName)
            setBloodPressure(props.visit.bloodPressure)
            setHeartRate(props.visit.heartRate)
        }
    }, [])

    const addNewData = (event) => {
        event.preventDefault()
        console.log("Is it getting here?")
        const url = 'http://localhost:6000/doctor-visit/'
        if(props.dataType === 'EDIT_DATA'){
            const body = {
                visitId: props.visit.visitId,
                date: date,
                clinicianName: clinicianName,
                notes: notes,
                bloodPressure: bloodPressure,
                heartRate: heartRate
            }
            sendEdit(body, url, props, dispatch, userInfo, editDoctor)
        }else if(props.dataType === 'NEW_DATA'){
            const body = {
                date: date,
                clinicianName: clinicianName,
                notes: notes,
                bloodPressure: bloodPressure,
                heartRate: heartRate
            }
            sendNewData(body, url, props, dispatch, userInfo, addDoctor)
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
                        id="outlined-textarea"
                        label="Doctor Visited"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.visit.clinicianName : ''}
                        onChange={e => setClinicianName(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="bloodPressure"
                        id="outlined-textarea"
                        label="Blood Pressure"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.visit.bloodPressure : ''}
                        onChange={e => setBloodPressure(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="heartRate"
                        id="outlined-textarea"
                        label="Heart Rate"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.visit.heartRate : ''}
                        onChange={e => setHeartRate(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="notes"
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        defaultValue={edit ? props.visit.notes : ''}
                        onChange={e => setNotes(e.target.value)}
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

export default DoctorVisitModal