'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cakades_ilham extends Model {
    static associate(models) {
      this.belongsTo(models.relawan_ilham, { targetKey :'id_cakades',foreignKey: 'id' });
      this.belongsTo(models.timses_ilham, { targetKey :'id_cakades',foreignKey: 'id' });   
      this.belongsTo(models.simpatisan_ilham, { targetKey :'id_cakades',foreignKey: 'id' });   
      this.belongsTo(models.hasil_pemilihan_ilham, { targetKey :'id_cakades',foreignKey: 'id' });   
      this.belongsTo(models.desa_ilham, { targetKey :'id',foreignKey: 'id_desa' });   
    }
  }
  
  cakades_ilham.init({
    nik_cakades: DataTypes.STRING,
    nama_cakades: DataTypes.STRING,
    alamat_cakades: DataTypes.STRING,
    id_desa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cakades_ilham',
    underscored: true,
  });

  return cakades_ilham;
};
