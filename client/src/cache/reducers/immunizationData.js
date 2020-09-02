// TODO: ADD EDIT AND DELETE

const immunizationData = (state = [], action) => {
    switch(action.type){
        case 'IMMUNIZATION_DATA_INIT':
            return state = action.data;
        case 'IMMUNIZATION_DATA_ADD':
            state.push(action.data);
            return state;
        case 'IMMUNIZATION_DATA_EDIT':
            for(var i = 0; i < state.length; i++) {
                if(state[i].recordId === action.data.recordId){
                    state[i].vaccine = action.data.vaccine;
                    state[i].dateGiven = action.data.dateGiven;
                    state[i].administeredBy = action.data.administeredBy;
                    state[i].nextDose = action.data.nextDose;
                    break;
                }
            }
            return state;
        case 'IMMUNIZATION_DATA_DELETE':
            var newState = [];
            for(var i = 0; i < state.length; i++){
                if(state[i].recordId === action.recordId){
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

export default immunizationData