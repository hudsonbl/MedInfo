import React , {useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { addImmunization, editImmunization } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendEdit, sendNewData } from './modal-api/ModalServerRequest';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const ImmunizationRecordModal = (props) => {
    const [ edit, setEdit ] = useState(false)
    const [ querySuccess, checkQuery ] = useState(false)
    const [ vaccine, setVaccine ] = useState('')
    const [ dateGiven, setDateGiven ] = useState('')
    const [ administeredBy, setAdministeredBy ] = useState('')
    const [ nextDose, setNextDose ] = useState('')
    const [ today, setToday ] = useState('')

    const classes = useStyles()
    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.dataType === 'EDIT_DATA'){
            setEdit(true)
            // Set modal values to be able to modify current values
            setVaccine(props.record.vaccine)
            setDateGiven(props.record.dateGiven)
            setAdministeredBy(props.record.administeredBy)
            setNextDose(props.record.nextDose)
        }
        var d = new Date()
        var dd = String(d.getDate()).padStart(2, '0');
        var mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = d.getFullYear();

        setToday(mm + '-' + dd + '-' + yyyy)
    }, [])

    const addNewData = (event) => {
        event.preventDefault()
        console.log("Is it getting here?")
        const url = 'http://localhost:6000/immunization-record/'
        if(props.dataType === 'EDIT_DATA'){
            const body = {
                recordId: props.record.recordId,
                vaccine: vaccine,
                dateGiven: dateGiven,
                administeredBy: administeredBy,
                nextDose: nextDose
            }
            sendEdit(body, url, props, dispatch, userInfo, editImmunization)
        }else if(props.dataType === 'NEW_DATA'){
            const body = {
                vaccine: vaccine,
                dateGiven: dateGiven,
                administeredBy: administeredBy,
                nextDose: nextDose
            }
            sendNewData(body, url, props, dispatch, userInfo, addImmunization)
        }   
    }

    return (
        <Container>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        name="vaccine"
                        id="outlined-textarea"
                        label="Vaccine"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.record.vaccine : ''}
                        onChange={e => setVaccine(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="dateGiven"
                        onChange={e => setDateGiven(e.target.value)}
                        id="date"
                        label="Date Given"
                        type="date"
                        defaultValue={edit ? props.record.dateGiven  : today}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        name="administeredBy"
                        id="outlined-textarea"
                        label="Administered By"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.record.administeredBy : ''}
                        onChange={e => setAdministeredBy(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="nextDose"
                        onChange={e => setNextDose(e.target.value)}
                        id="date"
                        label="Next Dose"
                        type="date"
                        defaultValue={edit ? props.record.nextDose : today}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
                <Button variant="contained" color="primary" onClick={addNewData}>
                    Add
                </Button>
            </form>
        </Container>
    )
}

export default ImmunizationRecordModal