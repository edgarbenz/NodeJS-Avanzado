'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const agenteSchema = mongoose.Schema({
  name: { type: String, index: true },
  age: { type: Number, index:true }, // age: { type: Number}
  multado: Boolean,
  image: String
}, {
  collection: 'agentes'
});

// En los métodos de mongoose no usar Arrow Functions
agenteSchema.statics.lista = function(filtro, limit, skip, fields, sort) {
  const query = Agente.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.select(fields);
  query.sort(sort);
  return query.exec();
}

agenteSchema.methods.multar = function() {
  this.multado = true;
  return this.save();
}

// creamos el modelo con el esquema definido
const Agente = mongoose.model('Agente', agenteSchema);

// exportamos el modelo (opcional)
module.exports = Agente;
