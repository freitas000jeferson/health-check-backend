module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password_reset_token: {
        type: Sequelize.STRING,
      },
      photoLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cpfOrCnpj: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isAdmin: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      is_active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: async (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
