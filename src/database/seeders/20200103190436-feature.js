'use strict';
const uuidv4 = require('uuid/v4');
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
      Example:
      return queryInterface.bulkInsert('Features', [{
        id: uuidv4(),
        name: 'users',
        updatedAt: new Date(),
        createdAt: new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      Example:
      return queryInterface.bulkDelete('Features', null, {});
    
  }
};
