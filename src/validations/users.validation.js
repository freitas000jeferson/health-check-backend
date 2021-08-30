const yup = require('yup');

const list = {
  query: yup.object().shape({
    page: yup.number().integer().default(1),
    perPage: yup.number().integer().default(10),
    sortBy: yup
      .string()
      .default('createdAt:desc')
      .matches(
        /[:](asc|desc)/i,
        "sorting order must be one of the following: 'asc' or 'desc'"
      ),
  }),
};

const get = {
  params: yup.object().shape({
    id: yup.number().integer(),
  }),
};
const findByCpfOrCnpj = {
  params: yup.object().shape({
    params: yup.string(),
  }),
};

const create = {
  body: yup.object().shape({
    name: yup.string(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    photoLink: yup.string(),
    cpfOrCnpj: yup.string(),
  }),
};

const email = {
  body: yup.object().shape({
    email: yup.string().email().required(),
  }),
};
const updatePassword = {
  body: yup.object().shape({
    email: yup.string().email().required(),
    questionpassId: yup.number().integer().required(),
    answer: yup.string().required(),
    newPassword: yup.string().min(8).required(),
  }),
};

const answer = {
  body: yup.object().shape({
    answer: yup.string().required(),
  }),
};

const update = {
  params: yup.object().shape({
    id: yup.number().integer(),
  }),
  body: yup.object().shape({
    name: yup.string(),
    email: yup.string().email(),
    password: yup.string().min(8),
    photoLink: yup.string(),
    cpfOrCnpj: yup.string(),
  }),
};

const destroy = {
  params: yup.object().shape({
    id: yup.number().integer(),
  }),
};

module.exports.users = {
  list,
  findByCpfOrCnpj,
  get,
  create,
  update,
  destroy,
  email,
  answer,
  updatePassword,
};
