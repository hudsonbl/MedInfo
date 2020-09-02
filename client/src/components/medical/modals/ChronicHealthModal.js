import React , { useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import {addChronic, editChronic} from '../../../cache/actions'
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

const ChronicHealthModal = (props) => {
    const [ edit, setEdit ] = useState(false)
    // const [ querySuccess, checkQuery ] = useState(false)
    const [ condition, setCondition ] = useState('')
    const [ notes, setNotes ] = useState('')
    
    const classes = useStyles()

    const userInfo = useSelector(state => state.userInfoReducer)
    const dispatch = useDispatch();

    useEffect(() => {
        if(props.dataType === 'EDIT_DATA'){
            setEdit(true)
            // Set modal values to be able to modify current values
            setCondition(props.health.condition)
            setNotes(props.health.notes)
        }
    }, [])

    const addNewData = (event) => {
        event.preventDefault()
        console.log("Is it getting here?")
        const url = 'http://localhost:6000/chronic-health/'
        if(props.dataType === 'EDIT_DATA'){
            const body = {
                chronicId: props.health.chronicId,
                condition: condition,
                notes: notes
            }
            sendEdit(body, url, props, dispatch, userInfo, editChronic)
        }else if(props.dataType === 'NEW_DATA'){
            const body = {
                condition: condition,
                notes: notes,
            }
            sendNewData(body, url, props, dispatch, userInfo, addChronic)
        }   
    }

    return (
        <Container>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        name="condition"
                        id="outlined-textarea"
                        label="Condition"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        defaultValue={edit ? props.health.condition : ''}
                        onChange={e => setCondition(e.target.value)}
                        inputProps={{ maxLength: 100 }}
                    />
                    <TextField
                        name="notes"
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        defaultValue={edit ? props.health.notes : ''}
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

export default ChronicHealthModal