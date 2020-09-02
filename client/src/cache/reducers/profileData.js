
const profileData = (state = [], action) => {
    switch(action.type){
        case 'PROFILE_NAME':
            state.name = action.name;
            return state;
        case 'PROFILE_IMAGE':
            state.image = action.image;
            return state;
        default:
            return state
    }
}

export default profileData