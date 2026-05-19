'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }
  Doctor.init({
     id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      specialization: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true
      },
      qualification: {
        type: DataTypes.STRING,
        allowNull: false
      },
      experience_year: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      consultation_fee: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true
      },
      license_number: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
      },
      hospital_name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gender: {
        type: DataTypes.ENUM('male','female','other'),
        allowNull: false
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      language: {
        type: DataTypes.JSON,
        allowNull: true
      },
      profile_image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pincode: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.DECIMAL(10,8),
        allowNull: true
      },
      longitude: {
        type: DataTypes.DECIMAL(11,8),
        allowNull:true
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Asia/Kolkata'
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      average_rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
      },
      total_reviews: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      last_login_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.UUID,
        allowNull: true
      }
  }, {
    sequelize,
    modelName: 'Doctor',
    tableName: 'doctors',
    timestamps: true,
    indexes: [
      // { fields: ['user_id'] },
      { fields: ['specialization'] },
      { fields: ['department'] },
      { fields: ['license_number'] },
      { fields: ['city'] },
      { fields: ['state'] },
      { fields: ['is_verified'] },
      { fields: ['is_available'] }
    ],
  });
  return Doctor;
};