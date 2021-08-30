const { StatusCodes } = require('http-status-codes');
const { catchAsync } = require('../utils');
const { usersService } = require('../services');

module.exports = {
  list: catchAsync(async (req, res) => {
    const { page, perPage, sortBy } = req.query;
    const response = await usersService.list({ page, perPage, sortBy });

    if (!response || response.data.length === 0) {
      return res.status(StatusCodes.NO_CONTENT).end();
    }

    return res.status(StatusCodes.OK).json(response);
  }),

  get: catchAsync(async (req, res) => {
    const { id } = req.params;
    const response = await usersService.get(id);
    return res.status(StatusCodes.OK).json(response);
  }),

  create: catchAsync(async (req, res) => {
    const { body } = req;

    body.isAdmin = false;
    body.isActive = true;
    const response = await usersService.create(body);

    return res.status(StatusCodes.CREATED).json(response);
  }),

  createAdmin: catchAsync(async (req, res) => {
    const { body } = req;

    body.isAdmin = true;
    body.isActive = true;
    const response = await usersService.create(body);

    return res.status(StatusCodes.CREATED).json(response.id);
  }),

  disableUser: catchAsync(async (req, res) => {
    const {
      params: { id },
    } = req;
    const response = await usersService.update(id, {
      isActive: false,
    });
    return res.status(StatusCodes.OK).json(response);
  }),

  enableUser: catchAsync(async (req, res) => {
    const {
      params: { id },
    } = req;
    const response = await usersService.update(id, {
      isActive: true,
    });
    return res.status(StatusCodes.OK).json(response);
  }),

  update: catchAsync(async (req, res) => {
    const {
      params: { id },
      body,
    } = req;
    const response = await usersService.update(id, body);
    return res.status(StatusCodes.OK).json(response);
  }),

  destroy: catchAsync(async (req, res) => {
    const { id } = req.params;
    await usersService.destroy(id);
    return res.status(StatusCodes.NO_CONTENT).end();
  }),

  existEmail: catchAsync(async (req, res) => {
    const { email } = req.body;
    const response = await usersService.existEmail(email);
    return res.status(StatusCodes.OK).json(response);
  }),

  logout: catchAsync(async (req, res) => {
    const {
      session: { id, token },
    } = req;
    await usersService.logout(id, token);
    return res.status(StatusCodes.NO_CONTENT).end();
  }),
  findByCpfOrCnpj: catchAsync(async (req, res) => {
    const { params } = req.params;
    const response = await usersService.findByCpfOrCnpj(params);
    return res.status(StatusCodes.OK).json(response);
  }),
};
