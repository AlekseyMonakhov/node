const {Sequelize, INTEGER, STRING} = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: true,
      primaryKey: true
    },
    name: STRING,
    email: STRING
});

module.exports = User;