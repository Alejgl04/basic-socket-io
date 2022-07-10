const Role = require('../models/role');
const User = require('../models/user');


const validRol = async ( role = '' ) => {
  const rolExists = await Role.findOne({role});
  if( !rolExists ) {
    throw new Error( `El rol: ${role} no es válido` )
  }
}

const validEmailExists = async( email = '' ) => {
  const emailExists = await User.findOne({ email });
  if ( emailExists  ) {
    throw new Error( `El correo electrónico ya está registrado` )
  }
}

const validUserById = async( id = '' ) => {
  const isUserById = await User.findById( id );
  if ( !isUserById  ) {
    throw new Error( `El id ingresado no existe` )
  }
}

const allowColections = ( colection = '', colections = []) => {
  const colectionDB = colections.includes(colection);
  if(!colectionDB) {
    throw new Error(`La colección ${colection} no es permitida, ${colections}`);
  }
  return true;
} 

module.exports = {

  validRol,
  validEmailExists,
  validUserById,

  allowColections


}