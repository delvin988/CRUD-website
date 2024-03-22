'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasOne(models.Category, { foreignKey: 'CategoryId' });
      Course.belongsTo(models.User, { foreignKey: 'UserId' });
    }

    get getduration(){
      return `${this.duration} minutes`
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};