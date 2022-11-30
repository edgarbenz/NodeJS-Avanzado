var express = require('express');
var router = express.Router();
/* GET /change-locale /:locale */
// poner una cookie para saber el idioma que me piden
// redirigir a la pagina de donde vine
router.get('/:locale', (req, res, next) => {
  const idioma = req.params.locale;
           // nombre cookie     valor    valida por estos milisegundos
  res.cookie('nodeapi-locale', idioma,  {maxAge: 1000 * 60 * 60 * 24 * 20});
// va a responder con una cookie y el i18 la detectara y asignará el valor idioma a locales: ['valor'] para renderizar en ese idioma
                     // con get me traigo cualquier parametro de Request Headers de inspeccionar en el navegador en red, cabeceras
  const deDondeVengo = req.get('referer');
  console.log('idioma que me pidieron: ', idioma);
  console.log('vengo de: ',deDondeVengo);
  res.redirect(deDondeVengo);
})

module.exports = router;