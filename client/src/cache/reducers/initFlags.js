// This reducer tracks which medinfo data points have successfully initially queried
// This reduces the amount of times the component attempts to fetch a lot of data. 

const initFlags = (state = {allergyFlag: false, 
                            chronicFlag: false, 
                            doctorFlag: false, 
                            drugFlag: false,
                            hospitalFlag: false,
                            immunizationFlag: false}, 
                  action) => {
    
    switch(action.type) {
        case 'ALLERGY_FLAG':
            state.allergyFlag = true;
            return state;
        case 'CHRONIC_FLAG':
            state.chronicFlag = true;
            return state;
        case 'DOCTOR_FLAG':
            state.doctorFlag = true;
            return state;
        case 'DRUG_FLAG':
            state.drugFlag = true;
            return state;
        case 'HOSPITAL_FLAG':
            state.hospitalFlag = true;
            return state;
        case 'IMMUNIZATION_FLAG':
            state.immunizationFlag = true;
            return state;
        default:
            return state;
    }
}

export default initFlags 