// TODO: ADD EDIT AND DELETE

const allergyData = (state = [], action) => {
    switch(action.type){
        case 'ALLERGY_DATA_INIT':
            return state = action.data;
        case 'ALLERGY_DATA_ADD':
            return state[0].push(action.data);
        default:
            return state
    }
}

export default allergyData