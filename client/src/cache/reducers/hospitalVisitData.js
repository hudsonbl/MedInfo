// TODO: ADD EDIT AND DELETE

const hospitalVisitData = (state = [], action) => {
    switch(action.type){
        case 'HOSPITAL_DATA_INIT':
            return state = action.data;
        case 'HOSPITAL_DATA_ADD':
            state.push(action.data);
            return state;
        case 'HOSPITAL_DATA_EDIT':
            for(var i = 0; i < state.length; i++){
                if(state[i].visitId === action.data.visitId){
                    state[i].date = action.data.date;
                    state[i].clinicianName = action.data.clinicianName;
                    state[i].notes = action.data.notes;
                    break;
                }
            }
            return state;
        case 'HOSPITAL_DATA_DELETE':
            var newState = [];
            for(var i = 0; i < state.length; i++){
                if(state[i].visitId === action.visitId){
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

export default hospitalVisitData