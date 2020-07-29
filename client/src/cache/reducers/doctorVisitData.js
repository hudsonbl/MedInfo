// TODO: ADD EDIT AND DELETE

const doctorVisitData = (state = [], action) => {
    switch(action.type){
        case 'DOCTOR_DATA_INIT':
            return state = action.data;
        case 'DOCTOR_DATA_ADD':
            return state.push(action.data);
        default:
            return state
    }
}

export default doctorVisitData