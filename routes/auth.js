const { Router } = require('express');
const { check }  = require('express-validator');
const { login, googleSignIn }  = require('../controllers/auth');
const { ValidFields } = require('../middlewares');
const router = Router();


router.post('/login', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  ValidFields
], login );

router.post('/google', [
  check('id_token', 'id_token es obligatorio').not().isEmpty(),
  ValidFields
], googleSignIn );


module.exports = router;