const userInfo = (state = {userId: '', uuId: '', bearerToken: '', name: '', isLoggedIn: false}, action) => {
    switch(action.type){
        case 'USER':
            return state = {
                userId: action.payload.userId,
                uuId: action.payload.uuId,
                bearerToken: action.payload.bearerToken,
                name: action.payload.name,
                isLoggedIn: action.payload.isLoggedIn
            }
        default:
            return state;
    }
};

export default userInfo;