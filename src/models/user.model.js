const { encryptor } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      passwordResetToken: {
        type: DataTypes.STRING,
        field: 'password_reset_token',
      },
      photoLink: {
        type: DataTypes.STRING,
      },
      cpfOrCnpj: DataTypes.STRING,
      isAdmin: {
        type: DataTypes.BOOLEAN,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: 'is_active',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: 'users',
    }
  );
  User.associate = (models) => {};

  User.beforeSave(async (user, options) => {
    const password = await encryptor.hashPassword(user.password);
    if (user.changed('password')) {
      Object.assign(user, { password });
    }
    return user;
  });

  User.prototype.toJSON = function () {
    const data = { ...this.get() };
    return Object.fromEntries(
      Object.entries(data)
        .filter(([key]) => !['password'].includes(key))
        .filter(([key]) => !['passwordResetToken'].includes(key))
    );
  };

  return User;
};
