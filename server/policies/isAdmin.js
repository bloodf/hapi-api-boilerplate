const boom = require('boom');

const AclRoles = require('../authentication/aclRoles');

async function Policy(request, h) {
  const { credentials } = request.auth;
  const Roles = AclRoles('admin') || [];

  if (Roles.includes(credentials.role)) {
    return h.continue;
  }

  throw boom.forbidden('Not Admin.');
}

Policy.applyPoint = 'onPreHandler';

module.exports = Policy;
