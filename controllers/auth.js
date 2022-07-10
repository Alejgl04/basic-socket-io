const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt.js');

const login = async ( req, res = response ) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    const checkPassword = bcryptjs.compareSync( password, user.password );

    if( !user ) {
      return res.status(400).json({
        ok:false,
        message: 'El correo ingresado no existe en nuestros registros de datos'
      });
    }
    //check user status true
    if ( !user.status ) {
      return res.status(400).json({
        ok:false,
        message: 'El correo ingresado se encuentra inactivo, hable con el administrador'
      });
    }
    //check the password
    if ( !checkPassword ) {
      return res.status(400).json({
        ok:false,
        message: 'La contraseña ingresada para este correo es inválida'
      });
    }
    //load JWT
    const token = await generateJWT( user.id )

    res.json({
      user,
      token
    })

  } catch (error) {
    console.log( error );
    return res.status(500).json({
      
      message: 'Ocurrio un error, verifique e intente nuevamente'

    });
  }
}


module.exports = {
  login
}