'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctors', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      specialization: {
        type: Sequelize.STRING,
        allowNull: false
      },
      department: {
        type: Sequelize.STRING,
        allowNull: true
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull: false
      },
      experience_year: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      consultation_fee: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      license_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hospital_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('male','female','other'),
        allowNull: false
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      language: {
        type: Sequelize.JSON,
        allowNull: true
      },
      profile_image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.DECIMAL(10,8),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL(11,8),
        allowNull:true
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Asia/Kolkata'
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      average_rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      total_reviews: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    //additional indexes
    // await queryInterface.addIndex('doctors',['user_id']);
    await queryInterface.addIndex('doctors',['specialization']);
    await queryInterface.addIndex('doctors',['department']);
    await queryInterface.addIndex('doctors',['license_number']);
    await queryInterface.addIndex('doctors',['city']);
    await queryInterface.addIndex('doctors',['state']);
    await queryInterface.addIndex('doctors',['is_verified']);
    await queryInterface.addIndex('doctors',['is_available']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctors');
  }
};