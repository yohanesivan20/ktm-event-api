const { validationResult } = require('express-validator')
const response = require('../helper/responseHelper')

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    response(422, null, errors.array(), res)
  }
  next();
};