const bcrypt = require("bcryptjs");

function hashPassword(password){
    return bcrypt.hashSync(password)
}

function compareHash(rawPass, password){
    return bcrypt.compareSync(rawPass, password)
}

module.exports = {
    hashPassword,
    compareHash
}

