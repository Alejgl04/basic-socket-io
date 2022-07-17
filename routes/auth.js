const { Router } = require('express');
const { check }  = require('express-validator');
const { login, googleSignIn, refreshTokenGet, refreshTokenPost }  = require('../controllers/auth');
const { ValidFields, validJWT } = require('../middlewares');
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

router.get('/refresh', validJWT,  refreshTokenGet );

router.post('/refresh',  refreshTokenPost );

module.exports = router;