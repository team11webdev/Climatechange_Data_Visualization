const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3rdTIMEcharm",
  database: "charttest",
});

module.exports = connection;
