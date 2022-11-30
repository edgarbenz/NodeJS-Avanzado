'use strict';

// creamos una función para usarla como un constructor de objetos
function Fruta() {
  console.log(this);
  this.nombre = 'Limon';

  this.saluda = () => {
    console.log('hola, soy', this.nombre);
  }
} 


// crear un objeto con ese constructor
const limon = new Fruta();

console.log(limon);

limon.saluda();