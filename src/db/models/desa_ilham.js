'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class desa_ilham extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.desa_ilham.belongsTo(models.cakades_ilham, { targetKey :'id_desa',foreignKey: 'id' });
    }
  }
  desa_ilham.init({
    nama_desa: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'desa_ilham',
    underscored: true,
  });
  return desa_ilham;
};