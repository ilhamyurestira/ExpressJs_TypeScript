'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cakades_ilhams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      nik_cakades: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      nama_cakades: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alamat_cakades: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      id_desa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'desa_ilhams',
          key: 'id'
        },
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
    await queryInterface.dropTable('cakades_ilhams');
  }
};