// TODO: ADD EDIT AND DELETE

const labReportData = (state = [], action) => {
    switch(action.type){
        case 'LAB_DATA_INIT':
            return state = action.payload;
        case 'LAB_DATA_ADD':
            state.push(action.data);
            return state;
        default:
            return state
    }
}

export default labReportData