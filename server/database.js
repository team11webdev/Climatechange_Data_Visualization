const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "3rdTIMEcharm",
  database: "charttest",
});

module.exports = connection;
