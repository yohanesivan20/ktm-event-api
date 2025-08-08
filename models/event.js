const { DataTypes } = require('sequelize')
const sequelize = require('../config/conn-db')

const Event = sequelize.define('Event', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey:true },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    event_date: { type: DataTypes.DATE, allowNull: false },
    registration_start_date: { type: DataTypes.DATE, allowNull: false },
    registration_end_date: { type: DataTypes.DATE, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    banner_url: { type: DataTypes.TEXT, allowNull: true },
    form_url: { type: DataTypes.STRING, allowNull: true },
    created_by: { type: DataTypes.INTEGER, allowNull: false },
    updated_by: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false }
}, {
    timestamps: false,
    tableName: 'events',
})

Event.associate = (models) => {
  Event.belongsTo(models.EventCategory, {
    foreignKey: 'category_id',
    as: 'EventCategory'
  });
};

module.exports = Event