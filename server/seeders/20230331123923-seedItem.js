'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Item = require("../data/item.json");
    // console.log(Item)
    Item.forEach(el => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    })
    await queryInterface.bulkInsert("Items", Item, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {
      restartIdentity: true
    });
  }
};
