// TODO: ADD EDIT AND DELETE

const drugPrescriptionData = (state = [], action) => {
    switch(action.type){
        case 'DRUG_DATA_INIT':
            return state = action.data;
        case 'DRUG_DATA_ADD':
            state.push(action.data);
            return state;
        case 'DRUG_DATA_EDIT':
            for(var i = 0; i < state.length; i++) {
                if(state[i].prescriptionId === action.data.prescriptionId){
                    state[i].name = action.data.name;
                    state[i].startdate = action.data.startdate;
                    state[i].enddate = action.data.enddate;
                    state[i].symptoms = action.data.symptoms;
                    break;
                }
            }
            return state;
        case 'ALLERGY_DATA_DELETE':
            var newState = [];
            for(var i = 0; i < state.length; i++){
                if(state[i].prescriptionId === action.prescriptionId){
                    continue;
                }else {
                    newState.push(state[i]);
                }
            }
            return newState;
        default:
            return state;
    }
}

export default drugPrescriptionData