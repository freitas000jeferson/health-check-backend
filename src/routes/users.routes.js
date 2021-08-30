const router = require('express').Router();
const { usersController } = require('../controllers');
const { isAuthorized, validate } = require('../middlewares');
const {
  validationSchemas: { users },
} = require('../validations');

// router.post('/admin', validate(users.create), usersController.createAdmin);
router.post('/exist-email', validate(users.email), usersController.existEmail);

router.use(isAuthorized);
router.put('/logout', usersController.logout);

router.get('/', validate(users.list), usersController.list);
router.get('/:id', validate(users.get), usersController.get);
router.get(
  '/cpfOrCnpj/:params',
  validate(users.findByCpfOrCnpj),
  usersController.findByCpfOrCnpj
);

// router.post('/', validate(users.create), usersController.create);
router.put('/:id', validate(users.update), usersController.update);
router.delete('/:id', validate(users.destroy), usersController.destroy);

router.put('/:id/disable', validate(users.get), usersController.disableUser); // dasabilita o proprio usuario(pelo token)
router.put('/:id/enable', validate(users.get), usersController.enableUser);

module.exports.users = router;
