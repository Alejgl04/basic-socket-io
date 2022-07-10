const { response } = require('express');
const User         = require('../models/user');
const bcryptjs     = require('bcryptjs');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * Get many users
 */
const getAllUsers = async ( req, res = response ) => {
  // const status = { status : true };
  const { limit = 15, from = 0 } = req.query;

  const [totals,users] = await Promise.all([
    User.countDocuments(),
    User.find()
    .limit(Number(limit))
    .skip(Number(from)),
  ]);

  res.json({
    totals,
    users,
  });  
};

const getUserById = async ( req, res = response ) => {
  const id = req.params.id;
  
  const user = await User.findById( id );

  res.json({
    ok:true,
    user
  });
};

/**
 * 
 * @param {*} req
 * @param {*} res 
 * create a new user data
 */
const createUsers = async( req, res = response ) => {

  const { name, email, password, role, status } = req.body;
  
  const user = new User({ name, email, password, role, status });

  // hash the password
  const salt    = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  await user.save();
  res.json({
    ok:true,
    message:'Se ha completado el registro de usuario exitoso',
    user
  });
}

const deleteUsers = async ( req, res = response ) => {
  const id = req.params.id;
  const user = await User.findByIdAndDelete( id )
  res.json({
    ok:true,
    message:'Se ha eliminado el usuario exitosamente',
    user,
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  createUsers,
  deleteUsers
};

