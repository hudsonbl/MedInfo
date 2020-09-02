import allergyData from './allergyData';
import chronicHealthData from './chronicHealthData';
import doctorVisitData from './doctorVisitData';
import drugPrescriptionData from './drugPrescriptionData';
import hospitalVisitData from './hospitalVisitData';
import immunizationData from './immunizationData';
import labReportData from './labReportData';
import userInfo from './userInfo';
import initFlags from './initFlags';
import {combineReducers} from 'redux';
import profileData from './profileData';

const allReducers = combineReducers({
    allergyReducer: allergyData,
    chronicReducer: chronicHealthData,
    doctorReducer: doctorVisitData,
    prescriptionReducer: drugPrescriptionData,
    hospitalReducer: hospitalVisitData,
    immunizationReducer: immunizationData,
    labReportReducer: labReportData,
    userInfoReducer: userInfo,
    userProfileReducer: profileData,
    initFlagsReducer: initFlags
});

const rootReducer = (state, action) => {
    // When a user logs out the action is dispatched to reset redux
    if(action.type === 'USER_LOGGED_OUT'){
        console.log("=============== Loggin OUT ===============");
        localStorage.clear();
        state = undefined;
    }

    return allReducers(state, action);
};

export default rootReducer;