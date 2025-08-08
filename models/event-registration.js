const { DataTypes } = require('sequelize')
const sequelize = require('../config/conn-db')

const EventRegistration = sequelize.define('EventRegistration', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true },
    event_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1, comment: '1=registered, 2=cancelled, 3=attended' },
    registered_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'event_registrations',
})

module.exports = EventRegistration