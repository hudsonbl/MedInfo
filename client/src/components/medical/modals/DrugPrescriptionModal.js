import React , { useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'

import { addDrug, editDrug } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendEdit, sendNewData } from './modal-api/ModalServerRequest';
import {prescriptionURL} from '../../../config/configValues';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const DrugPrescriptionModal = (props) => {
    const [ edit, setEdit ] = useState(false)
    // const [ querySuccess, checkQuery ] = useState(false)
    const [ name, setName ] = useState('')
    const [ startdate, setStartDate ] = useState('')
    const [ enddate, setEndDate ] = useState('')
    const [ symptoms, setSymptom ] = useState('')
    const [ checkbox, setCheckbox] = useState(false)
    const [ today, setToday ] = useState('')
    

    const classes = useStyles()

    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.dataType === 'EDIT_DATA'){
            setEdit(true)
            // Set modal values to be able to modify current values
            setName(props.prescription.name)
            setStartDate(props.prescription.startdate)
            setEndDate(props.prescription.enddate)
            setSymptom(props.prescription.symptoms)
            if(props.prescription.enddate === 'Currently Using'){
                setCheckbox(true)
            }
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
                prescriptionId: props.prescription.prescriptionId,
                name: name,
                startdate: startdate,
                enddate: checkbox ? 'Currently Using' : enddate,
                symptoms: symptoms
            }
            sendEdit(body, prescriptionURL, props, dispatch, userInfo, editDrug)
        }else if(props.dataType === 'NEW_DATA'){
            const body = {
                name: name,
                startdate: startdate,
                enddate: checkbox ? 'Currently Using' : enddate,
                symptoms: symptoms
            }
            sendNewData(body, prescriptionURL, props, dispatch, userInfo, addDrug)
        }   
    }

    const toggleCheckbox = () => {
        setCheckbox(!checkbox)
    }

    return (
        <Container>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        name="name"
                        id="outlined-textarea"
                        label="Drug Name"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.prescription.name : ''}
                        onChange={e => setName(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="startdate"
                        onChange={e => setStartDate(e.target.value)}
                        id="date"
                        label="Date Started"
                        type="date"
                        defaultValue={edit ? props.prescription.startdate : today}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <FormControlLabel 
                        value="female" 
                        control={<Checkbox
                                onChange={toggleCheckbox}
                                checked={checkbox}
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />} 
                        label="Currently Using" />
                    
                    {checkbox ? '' : <TextField
                        name="enddate"
                        onChange={e => setEndDate(e.target.value)}
                        id="date"
                        label="Date Stopped"
                        type="date"
                        defaultValue={edit ? props.prescription.enddate : today}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />}
                    <TextField
                        name="symptoms"
                        id="outlined-multiline-static"
                        label="Symptoms"
                        multiline
                        rows={4}
                        variant="outlined"
                        defaultValue={edit ? props.prescription.symptoms : ''}
                        onChange={e => setSymptom(e.target.value)}
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

export default DrugPrescriptionModal