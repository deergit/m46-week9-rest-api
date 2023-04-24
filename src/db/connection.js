const { Sequelize } = require("sequelize");

const connection = new Sequelize(process.env.MYSQL_URI);

connection.authenticate();

console.log("DB connection established");

module.exports = connection;