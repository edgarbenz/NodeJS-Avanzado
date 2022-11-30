'use strict';

// función que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      if (false) {
        return reject(new Error('es el fin del mundo'));
      }
      resolve(67);
      
    }, ms);
  });
}


async function main() {
  // consumir la promesa
  const promesa = sleep(2000);

  console.log(promesa);

  try {
    const resultado = await promesa; // código asíncrono

    // JSON.parse('zzzzz'); // código síncrono

    console.log(resultado);

    for (let i = 0; i < 5; i++) {
      await sleep(1000);
      console.log('he esperado un segundo');
    }
  
  } catch (err) {
    console.log('Gestionamos el error con un try catch');
  }

}

main().catch(err => {
  console.log(err);
});