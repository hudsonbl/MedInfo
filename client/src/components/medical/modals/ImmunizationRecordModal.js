import React , {useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { addImmunization } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const ImmunizationRecordModal = (props) => {
    const [ querySuccess, checkQuery ] = useState(false)
    const [ vaccine, setVaccine ] = useState('')
    const [ dateGiven, setDateGiven ] = useState('')
    const [ administeredBy, setAdministeredBy ] = useState('')
    const [ nextDose, setNextDose ] = useState('')

    const classes = useStyles()

    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();

    const addNewData = (event) => {
        event.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userInfo.bearerToken}`,
                      'accept': 'application/json'},
            body: JSON.stringify({
                vaccine: vaccine,
                dateGiven: dateGiven,
                administeredBy: administeredBy,
                nextDose: nextDose
            })
        }

        fetch(`http://localhost:6000/immunization-record/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                // Upon a successful insert to db. Modal closes and data is propageted upwards and around to {MedInfoItem}List.js components
                if(data.successStatus){
                    console.log("Successful shit")
                    const body = {
                        recordId: data.recordId,
                        vaccine: vaccine,
                        dateGiven: dateGiven,
                        administeredBy: administeredBy,
                        nextDose: nextDose
                    }

                    dispatch(addImmunization(body))
                    props.handleClose();
                }
            })
            .catch(error => {
                console.log(error)
            });
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
                        onChange={e => setVaccine(e.target.value)}
                    />
                    <TextField
                        name="dateGiven"
                        onChange={e => setDateGiven(e.target.value)}
                        id="date"
                        label="Date Given"
                        type="date"
                        defaultValue="2017-05-24"
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
                        onChange={e => setAdministeredBy(e.target.value)}
                    />
                    <TextField
                        name="nextDose"
                        onChange={e => setNextDose(e.target.value)}
                        id="date"
                        label="Next Dose"
                        type="date"
                        defaultValue="2017-05-24"
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