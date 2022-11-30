'use strict';

console.log('empiezo');

// función que escribe un texto en la consola tras 2 segundos
function escribeTras2Segundos(texto, instruccionesParaDespues) {
  setTimeout(() => { 
    console.log(texto);
    instruccionesParaDespues();
  }, 2000);
}

function serie(arr, fn, callback) {
  if (arr.length == 0) { // si he terminado salgo
    callback();
    return;
  }
  // fn es escribeTras2Segundos
  fn('texto' + arr.shift(), function() { // este callback es un "cuando termines haz esto"
    serie(arr, fn, callback);
  })
}

serie([1, 2, 3, 4, 5], escribeTras2Segundos, function() {
  console.log('termino');
});

