const { Router } = require('express');
const { check }  = require('express-validator');

const { ValidFields, validJWT } = require('../middlewares');
const { validEmailExists, validUserById } = require('../helpers/db-valid');
const { getAllUsers, createUsers, getUserById, deleteUsers } = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers );

router.get('/:id', [
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom( validUserById ),
  ValidFields
], getUserById );

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min:6 }),
  check('email', 'El correo es inválido').isEmail(),
  check('email').custom( validEmailExists ),
  ValidFields
], createUsers );

router.delete('/:id', [
  validJWT,
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom( validUserById ),
  ValidFields,
], deleteUsers);


module.exports = router;