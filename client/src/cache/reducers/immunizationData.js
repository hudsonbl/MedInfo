// TODO: ADD EDIT AND DELETE

const immunizationData = (state = [], action) => {
    switch(action.type){
        case 'IMMUNIZATION_DATA_INIT':
            return state = action.data;
        case 'IMMUNIZATION_DATA_ADD':
            return state.push(action.data);
        default:
            return state
    }
}

export default immunizationData