const jwt = require('jsonwebtoken')
const response = require('../helper/responseHelper')

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token) response(401, null, "No token, authorization denied", res)

    try {
        const decode_token = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode_token
        next()
    } catch (error) {
        response(500, null, `Invalid token!`, res)
    }
}