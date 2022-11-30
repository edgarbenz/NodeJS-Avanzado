const coche = {
  ruedas: 4,
  marca: 'Renault',
  modelo: '5'
};

// const lamarca = coche.marca;
// const modelo = coche.modelo;

const { modelo, marca: lamarca } = coche;

console.log(lamarca);

const numeros = [10, 20, 30];

const [a, b] = numeros;

console.log( a, b);