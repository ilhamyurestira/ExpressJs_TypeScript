'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class relawan_ilham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.cakades_ilham, { foreignKey: 'id_cakades', as: 'cakades' });
      this.belongsTo(models.timses_ilham, { foreignKey: 'id_timses', as: 'timses' });
      this.hasMany(models.simpatisan_ilham, { foreignKey: 'id_cakades', sourceKey: 'id' });
      // define association here
    }
  }
  relawan_ilham.init({
    nik_relawan: DataTypes.STRING,
    nama_relawan: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    no_tps: DataTypes.INTEGER,
    id_cakades: DataTypes.INTEGER,
    id_timses: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'relawan_ilham',
    underscored: true,
  });
  return relawan_ilham;
};