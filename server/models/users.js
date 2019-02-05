/*eslint-disable */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    facebookId: {
      type: DataTypes.STRING,
      unique: true,
    },
    active: DataTypes.BOOLEAN,
    role: DataTypes.STRING,
  }, {
    hooks: {
      async beforeCreate(user) {
        user.password = await bcrypt.hash(`${user.password}`, 10);
      },
      async beforeUpdate(user) {
        user.password = await bcrypt.hash(`${user.password}`, 10);
      },
    },
  });

  users.prototype.validPassword = async function (password) {
    return bcrypt.compare(`${password}`, `${this.password}`);
  };

  return users;
};
