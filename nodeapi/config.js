require('dotenv').config();

module.exports =  {
  urlBD : process.env.DB_HOST + process.env.DB_NAME
}