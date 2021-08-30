const { StatusCodes } = require('http-status-codes');

const { usersRepository } = require('../../repositories');
const { ApplicationError } = require('../../utils');
const { messages } = require('../../helpers');

module.exports.changeAdmin = async (id) => {
  const user = await usersRepository.getById(id);
  if (!user) {
    throw new ApplicationError(
      messages.notFound('users'),
      StatusCodes.NOT_FOUND
    );
  }

  Object.assign(user, { isAdmin: !user.isAdmin });

  return usersRepository.update(user);
};
