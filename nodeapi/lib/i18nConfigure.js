'use strict';

const i18n =  require('i18n');
const path =  require('path');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'), // ".." son para que se regrese atras
  defaultLocale: 'en',
  autoReload: true, // es un nodemon pero para si cambio un archivo de idioma se recarga en automatico sin tirar la aplicacion
  syncFiles: true,  //si agrego una literal en un idioma se agraga en los demas idiomas
  cookie: 'nodeapi-locale'
});

// por si usamos i18n en scripts
i18n.setLocale('en');

module.exports = i18n;