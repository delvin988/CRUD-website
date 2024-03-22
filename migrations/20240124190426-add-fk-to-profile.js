'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addColumn('Profiles', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: 'id'
      }
    });
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeColumn('Profiles', 'UserId')

  }

};
