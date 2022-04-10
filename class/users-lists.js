const User = require("./user");


class UserList {
  list = [];

  constructor() {

  }

  addUser( username = User ) {
    this.list.push( username );
    console.log( this.list );
    return username;
  }

  updateUser( id, name ) {
    for( let user of this.list ) {
      if( user.id === id ) {
        username.name = name;
        break;
      }
    }

    console.log('************Actualizando usuario************');
    console.log( this.list );
  }

  getListUser() {
    return this.list;
  }

  getUserById( id ) {
    return this.list.find( username => username.id === id );
  }

  getUsersInSala( sala ) {
    return this.list.filter( username => username.sala === sala );
  }

  removeUser( id ) {
    const tempUsername = this.getUserById( id );
    this.list = this.list.filter( username => username.id !== id );
    return tempUsername;
  }
}

module.exports = UserList;