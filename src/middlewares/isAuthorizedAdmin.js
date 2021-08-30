const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { jwt, catchAsync, ApplicationError } = require('../utils');
const { messages } = require('../helpers');
const { accessTokenRepository, usersRepository } = require('../repositories');

module.exports = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers && req.headers.authorization) {
    const [scheme, credentials] = req.headers.authorization.split(' ');

    if (scheme.match(/^Bearer$/i)) {
      token = credentials;
    } else {
      throw new ApplicationError(
        messages.invalidAuthFormat,
        StatusCodes.UNAUTHORIZED
      );
    }
  } else {
    throw new ApplicationError(messages.authMissing, StatusCodes.UNAUTHORIZED);
  }

  let decoded;
  jwt.verify(token, (err, decodedToken) => {
    if (err) {
      throw new ApplicationError(err.message, StatusCodes.UNAUTHORIZED);
    }
    decoded = decodedToken;
  });

  const accessToken = await accessTokenRepository.get({
    where: { [Op.and]: [{ token }, { expired: false }] },
  });

  if (!accessToken) {
    throw new ApplicationError(
      messages.notFound('token'),
      StatusCodes.NOT_FOUND
    );
  }
  // verificar se o usuario é admin
  const {
    dataValues: { isAdmin, isActive },
  } = await usersRepository.getById(decoded.sub.id);

  // console.log('isAdmin:', isAdmin);
  if (!isAdmin) {
    throw new ApplicationError(
      messages.invalidAuthFormat,
      StatusCodes.UNAUTHORIZED
    );
  }
  if (!isActive) {
    throw new ApplicationError(
      messages.invalidAuthFormat,
      StatusCodes.UNAUTHORIZED
    );
  }

  req.session = { token, id: decoded.sub.id, email: decoded.sub.email };

  next();
});
