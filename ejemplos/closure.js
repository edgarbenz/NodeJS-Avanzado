'use strict';

function creaCoche(ruedas) { // 5
  // la variable valor está en este contexto
  const pepe = 'pepe';
  return {
    cuantasRuedas: function (algo) {
      console.log(ruedas);
      return ruedas;
    },
    cambiarValor(nuevoValor) {
      ruedas = nuevoValor;
    }
  }
}

const todoterreno = creaCoche(5);

// console.log(todoterreno.cuantasRuedas());
// todoterreno.cambiarValor(743);
// console.log(todoterreno.cuantasRuedas());

setTimeout(todoterreno.cuantasRuedas, 2000);

