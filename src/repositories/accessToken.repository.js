const { AccessToken } = require('../models');

module.exports = {
  create: (args) => AccessToken.create(args),
  get: (args) => AccessToken.findOne(args),
  findOne: (params) => AccessToken.findOne({ where: params }),
  update: (accessToken) => accessToken.save(),
};
