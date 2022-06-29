'use strict';

const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')
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

User.beforeCreate(async (user, options) => {
  const hash = await bcrypt.hash(user.password, 8)
  user.password = hash
})

module.exports = User