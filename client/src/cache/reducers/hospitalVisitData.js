// TODO: ADD EDIT AND DELETE

const hospitalVisitData = (state = [], action) => {
    switch(action.type){
        case 'HOSPITAL_DATA_INIT':
            return state = action.data;
        case 'HOSPITAL_DATA_ADD':
            return state.push(action.data);
        default:
            return state
    }
}

export default hospitalVisitData