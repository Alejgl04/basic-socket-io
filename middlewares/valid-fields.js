
const { validationResult }  = require('express-validator');
const { response } = require('express');

const ValidFields = ( req, res = response, next) => {
  const errs = validationResult(req);
  if ( !errs.isEmpty() ) {
      return res.status(400).json(errs);
  } 
  next();
}

module.exports = {
  ValidFields,
}