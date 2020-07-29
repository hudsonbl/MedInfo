import React , {useState, useEffect } from 'react';
import {
    TableContainer,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    Table,
    Paper
} from '@material-ui/core';
import axios from 'axios'
import AllergyRow from './AllergyRow';
import {initAllergy} from '../../cache/actions';
import {useSelector, useDispatch} from 'react-redux'

const AllergyList = () => { 
    const [ querySuccess, checkQuery ] = useState(false);

    const userInfo = useSelector(state => state.userInfoReducer);
    const allergyData = useSelector(state => state.allergyReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
		const requestOptions = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.bearerToken}`,
                'accept': 'application/json'
            }
        }
        
        fetch(`http://localhost:6000/allergies/${userInfo.userId}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                if(!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                if(data.successStatus){
                    console.log("==Data: ", data)
                    dispatch(initAllergy(data.allergies))
                }
            })
            .catch(error => {
                console.log("==error: ", error)
            });
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Allergy</TableCell>
                        <TableCell align="left">Medication</TableCell>
                        <TableCell align="left">Symptoms</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Create each row for allergy data */}
                    {allergyData !== undefined ? allergyData.map(allergy => 
                        <AllergyRow key={allergy.allergyId} allergy={allergy} />
                    ) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default AllergyList