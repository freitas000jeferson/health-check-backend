const { users } = require('./users.validation');
const { auth } = require('./auth.validation');
const { admin } = require('./admin.validation');

module.exports.validationSchemas = {
  users,
  auth,
  admin,
};
