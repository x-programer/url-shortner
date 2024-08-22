const sessionIdToUserTo = new Map();

function setUser(id,user){
    sessionIdToUserTo.set(id, user);
}

function getUser(id){
    return sessionIdToUserTo.get(id)
}

module.exports = {
    setUser,
    getUser
}