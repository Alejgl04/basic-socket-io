const { Router } = require('express');
const { gotyData, gotyVoto } = require('../controllers/goty');

const router = Router();

router.get('/goty', gotyData );

router.post('/goty/:id', gotyVoto);

module.exports = router;