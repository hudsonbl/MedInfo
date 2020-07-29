const userInfo = (state = {userId: '', bearerToken: '', isLoggedIn: false}, action) => {
    switch(action.type){
        case 'USER':
            return state = {
                userId: action.payload.userId,
                bearerToken: action.payload.bearerToken,
                isLoggedIn: action.payload.isLoggedIn
            }
        default:
            return state;
    }
};

export default userInfo;