import React , {useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import {addChronic} from '../../../cache/actions'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const ChronicHealthModal = (props) => {
    const [ querySuccess, checkQuery ] = useState(false)
    const [ condition, setCondition ] = useState('')
    const [ notes, setNotes ] = useState('')
    
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
                condition: condition,
                notes: notes
            })
        }

        fetch(`http://localhost:6000/chronic-health/${userInfo.userId}`, requestOptions)
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
                        chronicId: data.chronicId,
                        condition: condition,
                        notes: notes
                    }
                    dispatch(addChronic(body))
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
                        name="condition"
                        id="outlined-textarea"
                        label="Condition"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        onChange={e => setCondition(e.target.value)}
                    />
                    <TextField
                        name="notes"
                        id="outlined-multiline-static"
                        label="Notes"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={e => setNotes(e.target.value)}
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