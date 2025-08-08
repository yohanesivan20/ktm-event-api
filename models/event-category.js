const { DataTypes } = require('sequelize')
const sequelize = require('../config/conn-db')

const EventCategory = sequelize.define('EventCategory', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING }
}, {
    timestamps: false,
    tableName: 'event-categories',
})

EventCategory.associate = (models) => {
    EventCategory.hasMany(models.Event, {
      foreignKey: 'category_id',
      as: 'Events'
    });
};

module.exports = EventCategory