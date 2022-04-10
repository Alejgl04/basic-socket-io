const { Server } = require("socket.io");

const checkCustomer = ( io ) => {

  io.on('connection', ( customer ) => {
    console.log('Cliente Conectado !');

    //get messages
    listenMessages( customer, io );

    //UsernameLogin
    listenUserLog( customer, io )

    //Desconnect
    offline( customer );

    
  });
}


//listen messages
const listenMessages = ( customer, io = Server ) => {

  customer.on('message', ( payload ) => {

    console.log( 'mensaje recibido' , payload );
    
    io.emit( 'new-message',payload );

    
    
  });
}

//listen usernames
const listenUserLog = ( customer, io = Server ) => {

  customer.on('config-user', ( payload, callback = Function ) => {
    console.log('Configurando usuario', payload.name );

    callback({
      ok:true,
      message: `Usuario ${ payload.name } configurado...`
    });
  });
}

const offline = ( customer ) => {

  customer.on('disconnect', () => {
    console.log('Cliente Desconectado !')
  });

}





module.exports = { 
  checkCustomer
}