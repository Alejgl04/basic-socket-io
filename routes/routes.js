const { Router } = require('express');
const { connectClient, usersConnect } = require('../socket-io/socket');

const router = Router();

router.get('/messages', ( req = Request, res = Response ) => {
  
  return res.json({
    ok:true,
    message: 'Todo bien!!'
  });
});

router.post('/messages/', ( req = Request, res = Response ) => {
  const content = req.body.messages;
  const from = req.body.from;

  const payload = {
    content,
    from
  }
  req.io.emit( 'new-message', payload );

  return res.json({
    ok:true,
    content,
    from,
  });
});

router.post('/messages/:id', ( req = Request, res = Response ) => {
  const content = req.body.messages;
  const from = req.body.from;
  const id   = req.params.id;

  const payload = {
    content,
    from
  }

  req.io.in( id ).emit( 'private-message', payload );

  return res.json({
    ok:true,
    content,
    from,
    id
  });
});

/*Obtener usuarios por id*/

router.get('/users', async( req = Request, res = Response) => {
  const clients  = (await req.io.fetchSockets()).map(socket => socket.id); 
  return res.json({
     ok:true,
     clients 
   });
});


/*Obtener usuarios y sus nombres*/

router.get('/users/detail', async( req = Request, res = Response) => {

  return res.json({
     ok:true,
     clients: usersConnect.getListUser()
   });
});







module.exports = router;