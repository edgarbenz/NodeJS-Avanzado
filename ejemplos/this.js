'use strict';

function Coche(ruedas) {
  this.ruedas = ruedas;
  
  this.cuantasRuedas = function() {
    // busca a la izquierda de la invocación al método (antes del punto)
    // y lo que haya ahí será el this
    console.log('tengo', this.ruedas, 'ruedas');
  }
  // return this;
}

const todoterreno = new Coche(4);

setTimeout(todoterreno.cuantasRuedas.bind(todoterreno), 2000);

const otraFuncion = todoterreno.cuantasRuedas.bind(todoterreno);
otraFuncion();

// todoterreno.cuantasRuedas();


