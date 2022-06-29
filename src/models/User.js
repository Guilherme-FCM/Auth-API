'use strict';

const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class User extends Model {}
User.init({
    userName: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, { sequelize }
)

module.exports = User