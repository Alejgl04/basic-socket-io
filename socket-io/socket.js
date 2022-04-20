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
    connectClient( customer, io );

    //UsernameLogin
    listenUserLog( customer, io )

    //get messages
    listenMessages( customer, io );

    getUsers( customer, io );

    //Desconnect
    offline( customer, io );
    
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
    io.emit('active-users', usersConnect.getListUser() );

    callback({
      ok:true,
      message: `Usuario ${ payload.name } configurado...`
    });
  });
}

const getUsers = ( customer, io = Server ) => {

  customer.on('get-users', () => {
    io.to( customer.id ).emit('active-users', usersConnect.getListUser() );
  });
}

const offline = ( customer, io ) => {
  
  customer.on('disconnect', () => {
    console.log('Cliente Desconectado !')
    usersConnect.removeUser(customer.id);
    io.emit('active-users', usersConnect.getListUser() );
    
  });

}



module.exports = { 
  checkCustomer,
  usersConnect
}