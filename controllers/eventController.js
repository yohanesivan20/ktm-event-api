const model = require('../models')
// const User = require('../models/user')
// const Event = require('../models/event')
// const EventCategory = require('../models/event-category')
// const EventRegistration = require('../models/event-registration')
const User = model.User
const Event = model.Event
const EventCategory = model.EventCategory
const EventRegistration = model.EventRegistration

const response = require('../helper/responseHelper')
const { Op, fn, col, where } = require('sequelize')
const debug = require('../utils/debug')

//API Get List With Filter
exports.getListEvent = async (req, res) => {
    const data = null
    const { event_month } = req.body

    try {
        const whereCondition = []

        if(event_month) {
            const monthNumber = parseInt(event_month, 10)

            if(monthNumber >= 1 && monthNumber <= 12) {
                whereCondition[fn('MONTH', col('event_date'))] = monthNumber;
            } else {
                response(400, data, 'Parameter event_month tidak valid. Gunakan format string MM (01-12)', res)
            }
        }

        let events = await Event.findAll({
            where: whereCondition,
            include: [{ model: EventCategory, as: 'EventCategory'}]
        })

        if(events.length === 0) {
            response(404, data, 'Tidak ada data event yang ditemukan', res)
        }

        response (200, events, 'Data event berhasil ditampilkan', res)
    } catch (error) {
        response (500, data, `Terjadi kesalahan pada server : ${error.message}`, res)
    }
}

exports.createEvent = async (req, res) => {
    const data = null

    try {
        
    } catch (error) {
        response (500, data, `Terjadi kesalahan pada server : ${error.message}`, res)
    }
}