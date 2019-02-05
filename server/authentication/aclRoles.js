const Roles = [
  {
    name: 'Admin',
    role: 'admin',
    group: ['admin', 'user'],
  },
  {
    name: 'User',
    role: 'user',
    group: ['user'],
  },
];

function findRole(baseRole = '') {
  if (baseRole) {
    return Roles.find(r => r.role === baseRole).group;
  }
  return Roles;
}

module.exports = findRole;
