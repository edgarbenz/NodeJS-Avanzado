'use strct';

const EventEmitter = require('events');

// creamos un emisor de eventos
const emisor = new EventEmitter();

emisor.on('llamada de telefono', (quien) => {
  if (quien === 'madre') return;
  console.log('suena el telefono');
});

emisor.once('llamada de telefono', () => {
  console.log('brr brr');
});

// emisor.emit('llamada de telefono');
// emisor.emit('llamada de telefono');
// emisor.emit('llamada de telefono');
// emisor.emit('llamada de telefono');
emisor.emit('llamada de telefono', 'madre');

process.on('beforeExit', () => {
  console.log('me salgo');
})
