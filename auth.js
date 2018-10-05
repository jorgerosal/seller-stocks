
// Amazon Dummy Account credentials
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.load();

let amzCredential = {
      url       : process.env.amz_LoginUrl,
      user      : process.env.amz_user,
      password  : process.env.amz_password
    }


// Mysql database credentials.
const sqlCredential = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
};


console.log(sqlCredential);
console.log(amzLogin);

// console.log(process.env)
module.exports = {
  sqlCredential  : sqlCredential,
  amzCredential  : amzCredential
}
