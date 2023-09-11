'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hasil_pemilihan_ilham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // hasil_pemilihan_ilham.associate = function(models) {
    //   hasil_pemilihan_ilham.belongsTo(models.Company, {foreignKey: 'id_cakades', as: 'cakades'})
    // };
    static associate(models) {
      this.belongsTo(models.cakades_ilham, { foreignKey: 'id_cakades', as: 'cakades' });
      // define association here
    }
  }
  hasil_pemilihan_ilham.init({
    id_cakades: DataTypes.INTEGER,
    no_tps: DataTypes.INTEGER,
    jumlah_suara: DataTypes.BIGINT,
  }, {
    sequelize,
    modelName: 'hasil_pemilihan_ilham',
    underscored: true,
  });
  
  return hasil_pemilihan_ilham;
};