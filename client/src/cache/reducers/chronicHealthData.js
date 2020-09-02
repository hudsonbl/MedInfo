// TODO: ADD EDIT AND DELETE

const chronicHealthData = (state = [], action) => {
    switch(action.type){
        case 'CHRONIC_DATA_INIT':
            return state = action.data;
        case 'CHRONIC_DATA_ADD':
            state.push(action.data);
            return state;
        case 'CHRONIC_DATA_EDIT':
            for(var i = 0; i < state.length; i++){
                if(state[i].chronicId === action.data.chronicId){
                    state[i].condition = action.data.condition;
                    state[i].notes = action.data.notes;
                    break;
                }
            }
            return state;
        case 'CHRONIC_DATA_DELETE':
            var newState = [];
            for(var i = 0; i < state.length; i++){
                if(state[i].chronicId === action.chronicId){
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

export default chronicHealthData