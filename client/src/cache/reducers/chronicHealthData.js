// TODO: ADD EDIT AND DELETE

const chronicHealthData = (state = [], action) => {
    switch(action.type){
        case 'CHRONIC_DATA_INIT':
            return state = action.data;
        case 'CHRONIC_DATA_ADD':
            return state.push(action.data);
        default:
            return state
    }
}

export default chronicHealthData