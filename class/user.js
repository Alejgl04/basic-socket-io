

class User {

  id = "";
  name = "";
  sala = "";
  constructor( id = String ) {
    this.id = id;
    this.name = 'no name';
    this.sala = 'no sala';
  }

}

module.exports = User;