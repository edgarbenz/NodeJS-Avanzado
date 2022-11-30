var express = require('express');
var router = express.Router();
const { query, param, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.ejemplo = res.locals.__('this is an example');
  // res.locals.ejemplo = 'esto es un ejemplo';

  res.locals.valorInyeccion = '<script>alert("código inyectado")</script>';

  const segundoActual = (new Date()).getSeconds();
  res.locals.condicion = {
    segundo: segundoActual,
    esPar: segundoActual % 2 === 0
  };

  res.locals.users = [
    { name: 'Smith', age: 31, imagen: '/images/iphone.jpg' },
    { name: 'Brown', age: 39 },
    { name: 'Jones', age: 22 },
  ];  

  res.render('index');
});

// GET /parametroenruta/*
router.get('/parametroenruta/:dato', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);
  res.send('He recibido el dato:' + dato);
});

router.get('/parametrofiltrado/:dato([0-9]+)', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);
  res.send('He recibido el dato:' + dato);
});

router.get('/parametroopcional/:dato?', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);
  res.send('He recibido el dato:' + dato);
});

// http://localhost:3000/parametros/55/piso/2/puerta/B
router.get('/parametros/:dato/piso/:piso/puerta/:puerta', [
  param('piso').isNumeric().withMessage('must be numeric')
], (req, res, next) => {
  validationResult(req).throw();
  const dato = req.params.dato;
  console.log(req.params);
  res.send('He recibido el dato:' + dato);
});

// recibir datos en query-string
// http://localhost:3000/querystring?dato=20
router.get('/querystring', [ // validaciones
  query('dato').isNumeric().withMessage('must be numeric'),
  query('talla').isAlpha().withMessage('must be literal'),
  query('talla').custom(talla => {
    if (talla !== 'L' && talla !== 'M') return false;
    return true;
  }).withMessage('must be L or M')
], (req, res, next) => {
  validationResult(req).throw();
  const dato = req.query.dato;
  console.log(req.query);
  res.send('He recibido el dato:' + dato);
});

router.post('/enelbody', (req, res, next) => {
  console.log(req.body);
  console.log('Cabecera', req.get('Content-type'));
  res.send('He recibido el dato:' + req.body.numero);
});

router.post('/redireccion', (req, res, next) => {
  res.redirect(301, '/users/5');

})

module.exports = router;
