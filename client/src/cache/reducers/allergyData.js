// TODO: ADD EDIT AND DELETE

const allergyData = (state = [], action) => {
    switch(action.type){
        case 'ALLERGY_DATA_INIT':
            return state = action.data;
        case 'ALLERGY_DATA_ADD':
            state.push(action.data);
            return state;
        case 'ALLERGY_DATA_EDIT':
            for(var i = 0; i < state.length; i++){
                if(state[i].allergyId === action.data.allergyId){
                    state[i].allergy = action.data.allergy;
                    state[i].medication = action.data.medication;
                    state[i].symptoms = action.data.symptoms;
                    break; 
                }
            }
            return state;
        case 'ALLERGY_DATA_DELETE':
            var newState = [];
            for(var i = 0; i < state.length; i++){
                if(state[i].allergyId === action.allergyId){
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

export default allergyData