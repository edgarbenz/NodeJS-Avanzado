'use strict';

const axios = require('axios');

main().catch(err => console.log(err));

async function main() {

  const url = 'http://localhost:3000/api/agentes';

  const response = await axios.get(url);

  console.log(response.data)

}