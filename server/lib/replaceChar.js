function encryptHash(hash){
    let newHash = hash.split('');
    for(var i = 0; i < newHash.length; i++){
        if(newHash[i] === '/'){
            newHash[i] = '^';
        }
    }

    return newHash.join('');
}
exports.encryptHash = encryptHash;

function decryptHash(hash){
    let newHash = hash.split('');
    for(var i = 0; i < newHash.length; i++){
        if(newHash[i] === '^'){
            newHash[i] = '/';
        }
    }

    return newHash.join('');
}
exports.decryptHash = decryptHash;