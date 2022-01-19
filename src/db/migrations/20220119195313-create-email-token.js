"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("email_tokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      token: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "user_id",
        },
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("email_tokens");
  },
};
