const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

function createToken(user) {

    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        SECRET,
        {
            expiresIn: "7d"
        }
    );

}

function verifyToken(token) {

    return jwt.verify(token, SECRET);

}

module.exports = {

    createToken,
    verifyToken

};
