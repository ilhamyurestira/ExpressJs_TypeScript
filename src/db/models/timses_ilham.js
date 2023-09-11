'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timses_ilham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.cakades_ilham, { foreignKey: 'id_cakades', as: 'cakades' });
      // define association here
    }
  }
  timses_ilham.init({
    nik_timses: DataTypes.STRING,
    nama_timses: DataTypes.STRING,
    alamat_timses: DataTypes.STRING,
    id_cakades: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'timses_ilham',
    underscored: true,
  });
  return timses_ilham;
};