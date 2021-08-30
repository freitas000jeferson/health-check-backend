const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports.findByCpfOrCnpj = async (params) => {
  const user = await usersRepository.find({
    where: { cpfOrCnpj: { [Op.like]: params } },
  });
  if (!user) {
    throw new ApplicationError(
      messages.notFound('users'),
      StatusCodes.NOT_FOUND
    );
  }

  return user;
};
