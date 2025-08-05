const response = (statusCode, datas, statusMessage, res) => {
    res.status(statusCode).json({
        payload: {
            response_code: statusCode,
            response_message: statusMessage,
            response_data: datas
        }
    })
}

module.exports = response