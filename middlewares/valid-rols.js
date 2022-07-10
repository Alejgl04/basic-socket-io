const { response } = require("express")

const isAdminRol = ( req, res = response, next ) => {
  if ( !req.user ) {
    return res.status(500).json({
      message: 'Ocurrio un error, se quiere verificar el rol sin validar el token'
    });
  }
  const { role, name } = req.user;
  
  if ( role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      message: `Petición fallida, el usuario ${name} no es un Administrador`
    });
  }

  next();
}

const isAdminAndUserRol = ( ...roles ) => {
  return ( req , res= response, next ) => {
    if ( !req.user ) {
      return res.status(500).json({
        message: 'Ocurrio un error, se quiere verificar el rol sin validar el token'
      });
    }
    if ( !roles.includes( req.user.role ) ) {
      return res.status(401).json({
        message: 'El servicio require los siguientes roles:' + roles
      });
    } 
    next();
  }
}

module.exports = {
  isAdminRol,
  isAdminAndUserRol
}