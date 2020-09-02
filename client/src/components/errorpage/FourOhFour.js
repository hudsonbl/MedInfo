import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import img from './404.jpg'

const useStyles = makeStyles((theme) => ({
	root: {
          display: 'flex',
          padding: '4px',
          margin: '4px',
          color: 'gre'
    },
    paperContainer: {
        height: '100vh',
        backgroundImage: `url(${img})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }
}));

const FourOhFour = () => {
    const classes = useStyles()

    return (
        <Box width={1} className={classes.paperContainer}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{minHeight: '100vh', minWidth: '100vh'}}
                > 
                <Typography style={{color: 'white', fontSize: '200px'}} variant="h1" letterSpacing={3}>
                    404
                </Typography>
                <Typography style={{color: 'white', fontSize: '40px'}} variant="p" className={classes.root}>
                    Error page not found
                </Typography>
                <Link color="inherit" style={{textDecoration: 'none'}} href='/'>
                    <Button style={{fontSize: '20px'}} variant="contained" color="secondary">
                        Home
                    </Button>
                </Link>
            </Grid>    
        </Box>
    )
}

export default FourOhFour