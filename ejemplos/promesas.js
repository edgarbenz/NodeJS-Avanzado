'use strict';

// función que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      if (true) {
        return reject(new Error('es el fin del mundo'));
      }
      resolve(67);
      
    }, ms);
  });
}

// consumir la promesa
const promesa = sleep(2000);

console.log(promesa);

promesa.then((resultado) => {
  console.log('La promesa se ha resuelto con resultado:', resultado);
  return sleep(2000);
}).then(() => {
  console.log('Pasaron otros 2 segundos')
  return sleep(2000);
}).catch(err => {
  console.log('Ha ocurrido un error, pero sigo');
  //throw new Error('segundo error');
}).then(() => {
  console.log('Pasaron otros 2 segundos');
  return 5;
}).then(valor => {
  console.log('el valor es', valor);
}).catch(err => {
  console.log('Ha ocurrido un error:', err);
});


