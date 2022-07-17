const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt.js');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = response ) => {

  const { email, password } = req.body;
  console.log(req.body);

  try {

    const user = await User.findOne({ email });

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
    const checkPassword = bcryptjs.compareSync( password, user.password );

    if ( !checkPassword ) {
      return res.status(400).json({
        ok:false,
        message: 'La contraseña ingresada para este correo es inválida'
      });
    }
    //load JWT
    const token = await generateJWT( user.id )

    res.json({
      ok:true,
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

const googleSignIn = async ( req, res = response ) => {
  const { id_token } = req.body;

  try {
    
    const {name, email } = await googleVerify( id_token );

    let user = await User.findOne({ email });

    if( !user ) {
      //save...
      const data = {
        name,
        email,
        password: ':P',
        google:true,
        status:true,
        role:'USER_ROLE'

      }
      user = new User( data );
      await user.save();
    }

    if( !user.status ) {
      return res.status(401).json({
        ok:false,
        message: 'Usuario inactivo - Hable con el admin'
      });    
    }

    const token = await generateJWT( user.id )


    res.json({
      ok:true,
      user,
      token
    })
  } catch (error) {
    return res.status(400).json({
      ok:false,
      error,
      message: 'El token no se pudo verificar de google'
    })
  }

}

const refreshTokenGet = async ( req, res = response ) => { 

  const userRequest = req.user;
  const token = await generateJWT( userRequest.id );

  return res.json({
    ok:true,
    user:userRequest,
    token
  })

}

const refreshTokenPost = async ( req, res = response ) => { 
  const token = req.header('x-token');
  if( !token ) {
    return res.status(401).json({
      ok:false,
      message: 'No hay token en la petición'
    });
  }
  var { payload } = jwt.decode(token, {complete: true});
  const user = await Usuario.findById( payload.uid );
  const newToken = await generateJWT( payload.uid );

  return res.json({
    ok:true,
    user,
    token:newToken
  })

}

module.exports = {
  login,
  googleSignIn,
  refreshTokenGet,
  refreshTokenPost
}