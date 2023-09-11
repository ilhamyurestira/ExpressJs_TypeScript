'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('timses_ilhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_cakades: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cakades_ilhams',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nik_timses: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      nama_timses: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      alamat_timses: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('timses_ilhams');
  }
};