'use strict';

process.exit();

function Persona(nombre) {
  this.nombre = nombre;

  // this.saluda = function() {
  //   console.log('Soy', this.nombre);
  // }
}

const pablo = new Persona('Pablo');

Persona.prototype.saluda = function() {
  console.log('Soy', this.nombre);
}

pablo.saluda();

// Herencia de persona -------------------------

function Agente(nombre) {
  // heredar el constructor de Persona
  // llamar a Persona con mi this
  Persona.call(this, nombre);
}

// heredar propiedades y métodos
// El prototipo de los Agentes sea una Persona

Agente.prototype = Object.create(Persona.prototype);
Agente.prototype.constructor = Agente;

const smith = new Agente('Smith');

smith.saluda();

// Herencia múltiple -------------------------------

// Patrón Mixin
function Superheroe() {
  this.vuela = function() {
    console.log(this.nombre, 'vuela');
  }
}

// copiar todas las propiedades de Superheroe al prototipo de Agente
Object.assign(Agente.prototype, new Superheroe());

smith.vuela();