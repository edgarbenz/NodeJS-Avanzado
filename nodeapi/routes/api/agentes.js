var express = require('express');
var router = express.Router();

const Agente = require('../../models/Agente');

/* GET /api/agentes */
// Lista de agentes
router.get('/', async function(req, res, next) {
  // Agente.find((err, resultado) => {
  //   if (err) {
  //     next(err);
  //     return;
  //   }
  //   res.json(resultado);
  // });

  // thenables
  // Agente.find().then(resultado => {
  //   res.json(resultado);
  // }).catch(err => {
  //   next(err);
  // });

  try {

    const name = req.query.name;
    const age = req.query.age;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    // http://localhost:3000/api/agentes?fields=age%20address%20-_id
    const sort = req.query.sort;
    // http://localhost:3000/api/agentes?sort=age%20-name
    // ordena por edad ascendente y por nombre descendente

    const filtro = {};

    if (name) {
      filtro.name = name
    }

    if (age) {
      filtro.age = age
    }

    const resultado = await Agente.lista(filtro, limit, skip, fields, sort);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
});

// GET /api/agentes:id
// Obtener un agente
router.get('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;

    const agente = await Agente.findOne({ _id: _id });

    if (!agente) {
      return res.status(404).json({ error: 'not found' });
    }
    res.json({ result: agente });

  } catch (err) {
    next(err);
  }
});

// POST /api/agentes (body)
// Crear un agente
router.post('/', async (req, res, next) => {
  try {
    const agenteData = req.body;

    const agente = new Agente(agenteData);

    const agenteCreado = await agente.save();

    await agente.multar();
// esperando hasta que se resuelva la promesa que devolvión multar()
    res.status(201).json({ result: agenteCreado });

  } catch (error) {
    next(error);
  }
});

// PUT /api/agentes:id (body)
// Actualizar un agente
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const agenteData = req.body;

    const agenteActualizado = await Agente.findOneAndUpdate({ _id: _id }, agenteData, { 
      new: true,
      useFindAndModify: false
    });
    // usamos { new: true } para que nos devuelva el agente actualizado

    if (!agenteActualizado) {
      res.status(404).json({ error: 'not found' });
      return;
    }

    res.json({ result: agenteActualizado });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/agentes:id
// Elimina un agente
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;

    await Agente.deleteOne({ _id: _id });

    res.json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
