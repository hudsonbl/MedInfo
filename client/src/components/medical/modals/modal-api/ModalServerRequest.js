// This file is responsible for sending server requests to add new data or edit a data piece for the modals.

function sendNewData(body, url, props, dispatch, userInfo, addDataCallback) {

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userInfo.bearerToken}`,
                  'accept': 'application/json'},
        body: JSON.stringify(body)
    };

    fetch(`${url}${userInfo.userId}`, requestOptions)
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // Upon a successful insert to db. Modal closes and data is propageted upwards and around to {MedInfoItem}List.js components
            if(data.successStatus){
                console.log("Adding ");
                const {id, status} = data
                body[Object.keys(data)[0]] = data[Object.keys(data)[0]]
                dispatch(addDataCallback(body));
                props.handleClose();
            }
        })
        .catch(error => {
            console.log(error);
        });    
}  
exports.sendNewData = sendNewData;

const sendEdit = (body, url, props, dispatch, userInfo, editDataCallback) => {
    console.log("EDIT: +++++++ > : ", body);
    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userInfo.bearerToken}`,
                  'accept': 'application/json'},
        body: JSON.stringify(body)
    };
    console.log("USER: ", userInfo)
    fetch(`${url}${userInfo.userId}`, requestOptions)
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // Upon a successful insert to db. Modal closes and data is propageted upwards and around to {MedInfoItem}List.js components
            if(data.successStatus){
                console.log("Editing ");
                dispatch(editDataCallback(body));
                props.handleClose();
            }
        })
        .catch(error => {
            console.log(error)
        });  
}
exports.sendEdit = sendEdit;

const sendDelete = (itemId, url, dispatch, userInfo, deleteDataCallback) => {

    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${userInfo.bearerToken}`,
                  'accept': 'application/json'},
    };
    console.log("USER: ", userInfo)
    fetch(`${url}${userInfo.userId}/${itemId}`, requestOptions)
        .then(async response => {
            const data = await response.json();

            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            // Upon a successful insert to db. Modal closes and data is propageted upwards and around to {MedInfoItem}List.js components
            if(data.successStatus){
                console.log("Editing ");
                dispatch(deleteDataCallback(itemId));
            }
        })
        .catch(error => {
            console.log(error)
        });  
}
exports.sendDelete = sendDelete;