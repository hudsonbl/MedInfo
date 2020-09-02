import React , {useState, useEffect } from 'react' 
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const QRDownloadModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      props.handleClose()
    };

    useEffect(() => {
        if(props.handleOpen){
            handleOpen()
        } 
    }, [props.handleOpen])
  
    return (
      <div>
          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
              timeout: 500,
              }}
          >
              <Fade in={open}>
                  <Paper className={classes.paper}>
                      <Button onClick={props.printQRCode}>
                          Print
                      </Button>
                      <Button onClick={handleClose}>
                          Cancel
                      </Button>
                  </Paper>
              </Fade>
          </Modal>
      </div>
    );
}

export default QRDownloadModal