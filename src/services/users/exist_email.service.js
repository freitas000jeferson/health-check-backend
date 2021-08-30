const { usersRepository } = require('../../repositories');

module.exports.existEmail = async (email) => {
  const user = await usersRepository.get({ email });
  if (!user) {
    return false;
  }
  return true;
};
