import React , {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { addAllergy, editAllergy, deleteAllergy } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'
import { sendEdit, sendNewData, sendDelete } from './modal-api/ModalServerRequest';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const AllergyModal = (props) => { 
    const [ edit, setEdit ] = useState(false)
    const [ allergy, setAllergy ] = useState('')
    const [ medication, setMedication ] = useState('')
    const [ symptom, setSymptom ] = useState('')
    
    const classes = useStyles()
    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(props.dataType === 'EDIT_DATA'){
            setEdit(true)
            // Set modal values to be able to modify current values
            setSymptom(props.allergy.symptoms)
            setMedication(props.allergy.medication)
            setAllergy(props.allergy.allergy)
        }
    }, [])

    const addNewData = (event) => {
        event.preventDefault()
        const url = 'http://localhost:6000/allergies/'

        if(props.dataType === 'EDIT_DATA'){
            const body = {
                allergyId: props.allergy.allergyId,
                allergy: allergy,
                medication: medication,
                symptoms: symptom
            }
            sendEdit(body, url, props, dispatch, userInfo, editAllergy)
        }else if(props.dataType === 'NEW_DATA'){
            const body = {
                allergy: allergy,
                medication: medication,
                symptoms: symptom
            }
            sendNewData(body, url, props, dispatch, userInfo, addAllergy)
        }
    }

    return (
        <Container>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        name="allergy"
                        id="outlined-textarea"
                        label="Allergy"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        
                        defaultValue={edit ? props.allergy.allergy : ''}
                        onChange={e => setAllergy(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="medication"
                        id="outlined-textarea"
                        label="Medication"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.allergy.medication : ''}
                        onChange={e => setMedication(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="symptom"
                        id="outlined-multiline-static"
                        label="Symptoms"
                        multiline
                        rows={4}
                        defaultValue={edit ? props.allergy.symptoms : ''}
                        variant="outlined"
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

export default AllergyModal

