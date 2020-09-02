import React , {useState, useEffect } from 'react' 
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import HomeIcon from '@material-ui/icons/Home';
import axios from 'axios'

const parentURL = '/';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Trademark '}
		<Link color="inherit" href={parentURL} to={parentURL}>
		  	MedInfo
		</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
	  	</Typography>
	);
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
	  	display: 'flex',
	},
	toolbar: {
	  	paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
	  	marginRight: 36,
	},
	menuButtonHidden: {
	  	display: 'none',
	},
	title: {
	  	flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
	 	height: 240,
	},
}));
const FirstResponder = () => {
    let urlPath = window.location.href.split('/');
    const uuId = urlPath[4];
    const classes = useStyles();
    return (
        <div className={classes.root}>
		<CssBaseline />
		<AppBar position="absolute" className={clsx(classes.appBar)}>
        	<Toolbar className={classes.toolbar}>
            <Link color="inherit" href="/" >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="Home Page"
                    className={clsx(classes.menuButton)}
                >
                    <HomeIcon />
                </IconButton>
            </Link> 
			<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
				MedInfo - Dashboard
			</Typography>
			
			</Toolbar>
		</AppBar>
		<main className={classes.content}>
			<div className={classes.appBarSpacer} />
			<Container maxWidth="lg" className={classes.container}>
                {/* This contains the buttons that will launch a modal to add each med info item data */}
                <AllergyTable uuId={uuId}/>
                <Box pt={4}>
                    <Copyright />
                </Box>
            </Container>
        </main>
    </div>
    )
}

export default FirstResponder



const useOtherStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function AllergyTable(props) {
    const classes = useOtherStyles();
    const [allergyData, setAllergyData ] = useState([])
	console.log("Props: ", props);
    useEffect(() => {
		const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'accept': 'application/json'
            }
        }
        
        fetch(`http://localhost:6000/first-responder/${props.uuId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    console.log("==Data: ", data)
                    setAllergyData(data.allergies)
                }
            })
            .catch(error => {
                console.log("==error: ", error)
            });
    }, []);

    console.log("Alergy data:", allergyData)
    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Allergy</TableCell>
                <TableCell >Medication</TableCell>
                <TableCell >Symptoms</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {allergyData.map((row) => (
                <TableRow key={row.allergyId}>
                <TableCell component="th" scope="row">
                    {row.allergy}
                </TableCell>
                <TableCell>{row.medication}</TableCell>
                <TableCell >{row.symptoms}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
