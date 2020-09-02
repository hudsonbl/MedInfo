import React , { useState } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import { addLab } from '../../../cache/actions';
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const LabReportModal = (props) => {
    const [ querySuccess, checkQuery ] = useState(false)
    const [ name, setName ] = useState('')
    const [ filetype, setFileType ] = useState('')
    const [ filepath, setFilePath ] = useState('')
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
                name: name,
                filetype: filetype,
                filepath: filepath,
                notes: notes
            })
        }

        fetch(`http://localhost:6000/lab-reports/${userInfo.userId}`, requestOptions)
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
                        name: name,
                        filetype: filetype,
                        filepath: filepath,
                        notes: notes
                    }
                    dispatch(addLab(body))
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
                        name="name"
                        id="outlined-textarea"
                        label="Name"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        name="filetype"
                        id="outlined-textarea"
                        label="FileType"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        onChange={e => setFileType(e.target.value)}
                    />
                    <TextField
                        name="filepath"
                        id="outlined-textarea"
                        label="Filepath"
                        placeholder="Placeholder"
                        multiline
                        variant="outlined"
                        onChange={e => setFilePath(e.target.value)}
                    />
                    <TextField
                        name="notes"
                        id="outlined-textarea"
                        label="Notes"
                        placeholder="Placeholder"
                        multiline
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

export default LabReportModal