const { Server } = require("socket.io");

const checkCustomer = ( io ) => {

  io.on('connection', ( customer ) => {
    console.log('Cliente Conectado !');

    //get messages
    listenMessages( customer, io );
    //Desconnect
    offline( customer );

    
  });
}


//listen messages
const listenMessages = ( customer, io = Server ) => {

  customer.on('message', ( payload ) => {

    console.log('mensaje recibido' , payload);
    
    io.emit( 'new-message',payload );
  
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