import React , {useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'

import { addDrug } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const DrugPrescriptionModal = (props) => {
    const [ querySuccess, checkQuery ] = useState(false)
    const [ name, setName ] = useState('')
    const [ startdate, setStartDate ] = useState('')
    const [ enddate, setEndDate ] = useState('')
    const [ symptoms, setSymptom ] = useState('')

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
                name: name,
                startdate: startdate,
                enddate: enddate,
                symptoms: symptoms
            })
        }

        fetch(`http://localhost:6000/drug-prescription/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                // Upon a successful insert to db. Modal closes and data is propageted upwards and around to {MedInfoItem}List.js components
                if(data.successStatus == true){
                    console.log("Successful shit")
                    const body = {
                        prescriptionId: data.prescriptionId,
                        name: name,
                        startdate: startdate,
                        enddate: enddate,
                        symptoms: symptoms
                    }
                    dispatch(addDrug(body))
                    props.handleClose();
                }
            })
            .catch(error => {
                console.log(error)
            })
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
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        name="startdate"
                        onChange={e => setStartDate(e.target.value)}
                        id="date"
                        label="Date Started"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        name="enddate"
                        onChange={e => setEndDate(e.target.value)}
                        id="date"
                        label="Date Stopped"
                        type="date"
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        name="symptoms"
                        id="outlined-multiline-static"
                        label="Symptoms"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={e => setSymptom(e.target.value)}
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