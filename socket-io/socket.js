const { Server } = require("socket.io");
const User = require("../class/user");
const { UserList } = require("../class/users-lists");

const usersConnect = new UserList();

const connectClient = ( customer ) => {
  const user = new User( customer.id );
  usersConnect.addUser( user );
}

const checkCustomer = ( io ) => {

  io.on('connection', ( customer ) => {
    console.log('Cliente Conectado !');

    //Connect customer
    connectClient( customer );

    //UsernameLogin
    listenUserLog( customer, io )

    //get messages
    listenMessages( customer, io );


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

//config usernames
const listenUserLog = ( customer, io = Server ) => {

  customer.on('config-user', ( payload, callback = Function ) => {
    usersConnect.updateUser( customer.id, payload.name );
    callback({
      ok:true,
      message: `Usuario ${ payload.name } configurado...`
    });
  });
}

const offline = ( customer ) => {
  
  customer.on('disconnect', () => {
    console.log('Cliente Desconectado !')
    usersConnect.removeUser(customer.id)
  });

}





module.exports = { 
  checkCustomer
}