/*eslint-disable */
const bcrypt = require('bcrypt');

const baseAdmin = {
  name: 'Admin User',
  email: 'admin@email.com',
  phone: '',
  password: 'admin',
  role: 'admin',
};

const baseUser = {
  name: 'User',
  email: 'user@email.com',
  phone: '',
  password: 'user',
};

module.exports = {
  up: async (queryInterface) => {
    const baseUsers = [baseAdmin, baseUser].map(user => ({
      ...user,
      password: bcrypt.hashSync(`${user.password}`, 10),
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('users', baseUsers, {});

    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});

    return new Promise((resolve, reject) => {
      resolve();
    });
  },
};
