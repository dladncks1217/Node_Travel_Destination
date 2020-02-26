require('dotenv').config();

module.exports={
  "development": {
    "username": process.env.DATABASE_USERNAME, 
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_DB,
    "host": process.env.DATABASE_HOST,
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
