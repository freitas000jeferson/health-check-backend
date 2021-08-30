const yup = require('yup');

const id = {
  params: yup.object().shape({
    id: yup.number().integer(),
  }),
};

module.exports.admin = {
  id,
};
