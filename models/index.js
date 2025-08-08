const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/conn-db');

const basename = path.basename(__filename);
const db = {};

// Import semua model di folder ini
fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && 
    file !== basename && 
    file.slice(-3) === '.js'
  ))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

// Panggil associate jika ada
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
