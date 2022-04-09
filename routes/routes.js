const { Router } = require('express');

const router = Router();


router.get('/messages', ( req = Request, res = Response ) => {
  
  return res.json({
    ok:true,
    message: 'Todo bien!!'
  });
});

router.post('/messages', ( req = Request, res = Response ) => {
  const data = req.body;
  return res.json({
    data,
    ok:true,
    message: 'POST Todo bien!!'
  });
});


module.exports = router;