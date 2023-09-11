'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('desa_ilhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_desa: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Reset sequence ke nomor 1 setelah penghapusan data
    await queryInterface.sequelize.query('ALTER SEQUENCE users_ilham_id_seq RESTART WITH 1;');
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('desa_ilhams');
  }
};