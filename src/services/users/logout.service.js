const { Op } = require('sequelize');
const { accessTokenRepository } = require('../../repositories');

module.exports.logout = async (id, token) => {
  const accessToken = await accessTokenRepository.get({
    where: {
      [Op.and]: [
        { token },
        {
          expired: false,
        },
      ],
    },
  });

  Object.assign(accessToken, { expired: true });

  return accessTokenRepository.update(accessToken);
};
