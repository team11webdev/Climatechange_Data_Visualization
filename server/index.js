const express = require("express");
const cors = require("cors");

const connection = require("./database");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));
const port = 3001;

// V3 annual data
app.get("/v3_annual", async function (req, res) {
  let sql = "SELECT * FROM v3_annual";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

// V3 monthly data
app.get("/v3_monthly", async function (req, res) {
  let sql = "SELECT * FROM v3_monthly";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

// V4 and V10
app.get("/v4_v10", async function (req, res) {
  let sql = "SELECT * FROM v4_v10";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

// V9 Sectors
app.get("/v9_sectors", async function (req, res) {
  let sql = "SELECT * FROM v9_sectors";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

// V9 Sub-Sectors
app.get("/v9_sub_sectors", async function (req, res) {
  let sql = "SELECT * FROM v9_sub_sectors";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  })
})

app.listen(port, function (err) {
  console.log("listening...." + port);
});
