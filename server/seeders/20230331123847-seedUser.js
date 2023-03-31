'use strict';
const {hashPassword} = require("../helpers/hashPassword")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const User = require("../data/user.json")
    User.forEach( el => {
      delete el.id;
      el.password = hashPassword(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Users", User,{});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      restartIdentity: true
    });
  }
};