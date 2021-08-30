const { Op } = require('sequelize');

module.exports.queryName = (options) => {
  const { name } = options;
  if (!name) return {};

  return { name: { [Op.ilike]: `%${name}%` } };
};
