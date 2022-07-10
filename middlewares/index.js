const validField = require('./valid-fields');
const validRol   = require('./valid-rols');
const validJWT   = require('./valid-jwt');



module.exports = {
  ...validField,
  ...validRol,
  ...validJWT
}
