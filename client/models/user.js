'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/hashPassword");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Item)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Email cannot be empty` },
        isEmail: { msg: `Must be an email` }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Password cannot be empty` },
        len: { args: [8, 255], msg: `Minimum password length is 5` }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: { msg: `Name cannot be empty` }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    const hash = hashPassword(user.password, 10);
    user.password = hash;
    user.role = "User";
  });

  return User;
};