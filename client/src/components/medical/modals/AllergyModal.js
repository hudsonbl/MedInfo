import React , {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { addAllergy } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));
  

const AllergyModal = (props) => { 
    const [ querySuccess, checkQuery ] = useState(false)
    const [ allergy, setAllergy ] = useState('')
    const [ medication, setMedication ] = useState('')
    const [ symptom, setSymptom ] = useState('')
    
    const classes = useStyles()

    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();

    const addNewData = (event) => {
        event.preventDefault()
        console.log("Is it getting here?")
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                      'Authorization': `Bearer ${userInfo.bearerToken}`,
                      'accept': 'application/json'},
            body: JSON.stringify({
              allergy: allergy,
              symptoms: symptom,
              medication: medication
            })
        }

        fetch(`http://localhost:6000/allergies/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                console.log(data.allergyId)

                // Upon a successful insert to db. Modal closes and data is propageted upwards and around to {MedInfoItem}List.js components
                if(data.successStatus){
                    const body = {
                        allergyId: data.allergyId,
                        allergy: allergy,
                        symptoms: symptom,
                        medication: medication
                    }
                    console.log("Adding ")
                    props.handleClose();
                    dispatch(addAllergy(body))
                }
                
            })
            .catch(error => {
                console.log(error)
                
            });        
    }
    

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    name="allergy"
                    id="outlined-textarea"
                    label="Allergy"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    onChange={e => setAllergy(e.target.value)}
                />
                <TextField
                    name="medication"
                    id="outlined-textarea"
                    label="Medication"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    onChange={e => setMedication(e.target.value)}
                />
                <TextField
                    name="symptom"
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
    )
}

export default AllergyModal

