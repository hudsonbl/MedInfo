// TODO: ADD EDIT AND DELETE

const drugPrescriptionData = (state = [], action) => {
    switch(action.type){
        case 'DRUG_DATA_INIT':
            return state = action.data;
        case 'DRUG_DATA_ADD':
            return state.push(action.data);
        default:
            return state
    }
}

export default drugPrescriptionData