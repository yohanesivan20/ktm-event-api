const jwt = require('jsonwebtoken')
const response = require('../helper/responseHelper')
const dd = require('../utils/debug')

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) response(401, null, "No token, authorization denied", res)

    try {
        const decode_token = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode_token
        next()
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            response(401, null, "Token expired!", res)
        }
        response(401, null, `Invalid token!`, res)
    }
}