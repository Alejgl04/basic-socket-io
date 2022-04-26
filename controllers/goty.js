const { response } = require('express');
const Goty = require('../models/goty');

const gotyData = async( req, res = response ) => {
  const [ totals, goty ] = await Promise.all([
    Goty.countDocuments(),
    Goty.find()
  ]);

  return res.json({
    ok:true,
    totals,
    goty
  });   
}

const gotyVoto = async( req, res = response ) => {
  const id = req.params.id;
  try {
    const gotyId   = await Goty.findById( id );
  
    if( !gotyId ){
      return res.status(404).json({
        ok:false,
        message: 'No match a game with this ID'
      });
    }
    else {
      await Goty.findByIdAndUpdate( id, {votos: gotyId.votos + 1}, { new: true });
      const [ totals, goty ] = await Promise.all([
        Goty.countDocuments(),
        Goty.find()
      ]);
      let gotyMap = goty.map( g => ({
        name: g.name,
        value:g.votos
      }));
      res.json({
        ok:true,
        totals,
        gotyMap
      });  
      req.io.emit('change-graphic', gotyMap );
    }
    
  } catch (error) {
    return res.status(404).json({
      ok:false,
      message: 'No match a game with this ID'
    })
  }
}

module.exports = {
  gotyVoto,
  gotyData
}