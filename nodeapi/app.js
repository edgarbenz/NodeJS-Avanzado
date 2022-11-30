var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();  // app es un servidor de express, al cual se le ponen sus rutas
// AHORA TODO SE BASA EN EXPRESS
require('./lib/connectMongoose');

app.use((req, res, next) => { // middleware con next() manual que express ejecutará DESPUES de una solicitud y ANTES de una respuesta con next() integrado
  res.locals._ = () => {
    return 'res.locals._ "esto es un guion"';
  }
  next();
})
// view engine setup
app.set('views', path.join(__dirname, 'views')); // express SETEA las vistas "views" al directorio \views
app.set('view engine', 'html'); // express SETEA la extension de los archivos vistas a "html" 
app.engine('html', require('ejs').__express); // el motor de vistas html de express las va a manejar el EJS

app.locals.title = 'NodeAPI'; // variable global de express valida aqui y las ramificaciones de app.js


app.use(logger('dev'));  // middleware con next() automatico que express ejecutara DESPUES de una solicitud y ANTES  de una respuesta con su next() integrado
// Express ahora puede usar las funciones de login en las respuestas incluyendo las vistas
app.use(express.json()); // middleware con next() automatico de express para poder mandar las respuestas en formato json en las respuestas y vistas
app.use(express.urlencoded({ extended: false })); // middleware con next() automatico de express para parsear solicitudes entrantes en url codificados
app.use(cookieParser()); // middleware con next() automatico, Para poder usar cookies con Express, necesitas el módulo cookie-paser

app.use(express.static(path.join(__dirname, 'startbootstrap-new-age'))); // middleware con next() automatico para que express busque archivos en este directorio
app.use(express.static(path.join(__dirname, 'public'))); // middleware con next() automatico para que express busque archivos en este directorio como los de las rutas
// app.use(express.static('/pdf', 'e:\pdfs'))


// Rutas del API para que un programa pueda interactuar con la BD con get post put delete
app.use('/api/agentes', require('./routes/api/agentes')); // middleware para responder osea sin next para que si a express le llega esta solicitud url, ejecute el archivo agentes
// entonces express buscara el archivo "agentes" primero en sus directorios designados en express.static y si no los hay ahora si en path del require

//setup de i18
const i18n =  require('./lib/i18nConfigure');
const { __ } = require('i18n');
app.use(i18n.init); // middleware con next() automatico que express ejecutara DESPUES  de una solicitud y ANTES de una respuesta con su next() integrado para que pase al siguiente
// ahora express puede usar las funciones de internacionalizacion en las respuestas incluyendo las vistas


/**
 * Rutas de mi Website
 */
app.use('/prueba', (req, res, next) => { // middleware con next manual para que si a expresss le llega esta solicitud url /prueba, responda con un next() al siguiente middleware
  // res.send(_());
  next();
});
app.use('/change-locale', require('./routes/change-locale'));
app.use('/',      require('./routes/index'));// middleware para responder osea sin next para que si a express le llega una solicitud url /, ejecute el archivo index
// entonces express busca el archivo "index"primero en sus directorios designados en express.estatic y si no los hay ahora si en el path del require
app.use('/services', require('./routes/services')) // middleware para responder osea sin next para que si a express le llega una solicitud url /services , ejecute el archivo services
// express lo va a buscar primero en sus directorios designados en express.static y si no lo encuentra lo buscara en el path del require
app.use('/users', require('./routes/users')); // middleware  para responder osea sin next para que si a express le llega una solicitud url /users, ejecute el archivo users
// express lo va a buscar primero en sus directorios express.static y si no lo encuentra entonces si se va a el path del require


// catch 404 and forward to error handler
app.use(function(req, res, next) { // middleware con next(createError(404)) manual  que se va a ejecutar siempre porque no tiene ninguna condicion, 
  next(createError(404)); // y se va al siguiente middleware pero con un error 404 y el otro middelware lo "cacha" en (err, req, res, next)
});

// error handler
app.use(function(err, req, res, next) { // a este middleware llegara pero como 2o paso del anterior middleware, con el error 404
  // Para pasarle el error se tienen que poner 4 parametros (err, req, res, next)

  // es un error de validación?
  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0]; // en err[0] = { onlyFirstError: true }
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`; // se establece el mensaje de error 
    err.status = 422; // se establece el status del error 
  }

  res.status(err.status || 500);  // se establece la respuesta dependiendo si el status existe o si es 500, seria true

  if (isAPIRequest(req)) { // si es una solicitud API 
    res.json({ error: err.message }); // respondo con el error en forma de JSON
    return;
  }
  
  // set locals, only providing error in development
  res.locals.message = err.message; // se setea la variable local message
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // se setea la variable local error , si la solicitud es get de desarrollo  se asigna el error si no un objeto vacio
  
  // render the error page
  res.render('error');
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf('/api/') === 0; // true si en la solicitud venia el string /api/
}

module.exports = app;  // se exporta todo el express listo para ser un servidor y se inserta en server a mano
// var server = http.createServer(app);
