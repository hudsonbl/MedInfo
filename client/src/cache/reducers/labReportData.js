// TODO: ADD EDIT AND DELETE

const labReportData = (state = [], action) => {
    switch(action.type){
        case 'LAB_DATA_INIT':
            return state = action.payload;
        case 'LAB_DATA_ADD':
            return state.push(action.payload);
        default:
            return state
    }
}

export default labReportData