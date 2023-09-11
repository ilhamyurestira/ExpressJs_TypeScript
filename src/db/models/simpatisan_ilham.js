'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class simpatisan_ilham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.cakades_ilham, { foreignKey: 'id_cakades', as: 'cakades' });
      this.belongsTo(models.relawan_ilham, { foreignKey: 'id_relawan', as: 'relawan' });
      // define association here
    }
  }
  simpatisan_ilham.init({
    nik_simpatisan: DataTypes.STRING,
    nama_simpatisan: DataTypes.STRING,
    alamat_simpatisan: DataTypes.STRING,
    id_cakades: DataTypes.INTEGER,
    id_relawan: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'simpatisan_ilham',
    underscored: true,
  });
  return simpatisan_ilham;
};