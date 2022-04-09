
const checkCustomer = ( io ) => {

  io.on('connection', ( customer ) => {
    console.log('Cliente Conectado !');

    //get messages
    listenMessages( customer );
    //Desconnect
    offline( customer );


  });
}


//listen messages
const listenMessages = ( customer ) => {

  customer.on('message', ( payload ) => {
    console.log('mensaje recibido' , payload);
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