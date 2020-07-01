// When the debug option is true. It enables console.logging for all endpoints
const debugMode = true;

exports.debug = function (message, error){
    if(debugMode == true){
        if(!!error){
            console.log(message, error);
        }else {
            console.log(message);
        }
    }
};
