const yup = require('yup');

const signin = {
  body: yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
};

const forgotPassword = {
  body: yup.object().shape({
    email: yup.string().email().required(),
  }),
};
const refreshToken = {
  body: yup.object().shape({
    token: yup.string().required(),
    refreshToken: yup.string().required(),
  }),
};
const resetPassword = {
  params: yup.object().shape({
    token: yup.string().required(),
  }),
  body: yup.object().shape({
    newPassword: yup.string().min(8).required(),
  }),
};

module.exports.auth = {
  signin,
  forgotPassword,
  resetPassword,
  refreshToken,
};
