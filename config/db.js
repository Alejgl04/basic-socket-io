const mongoose = require('mongoose');

const dbConnect = async() => {

  try {

    await mongoose.connect( process.env.MONGODB );
    
    console.log('BBDD ONLINE');

  } catch (error) {
    console.log( error );
    throw new Error('Error al iniciar la base de datos');
  }
}

module.exports = {
  dbConnect
}