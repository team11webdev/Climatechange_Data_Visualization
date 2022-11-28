const express = require("express");
const cors = require("cors");
const connection = require("./database");
const app = express();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

const port = 3001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// read data from database v1 v2
app.get("/", async function (req, res) {
  let sql = "SELECT * FROM v1_v2";
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

// V3 annual data
app.get("/v3_annual", async function (req, res) {
  let sql = "SELECT * FROM v3_annual";
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

// read data from database v5
app.get("/v5", async function (req, res) {
  let sql = "SELECT * FROM v5";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

// read data from database v6
app.get("/v6", async function (req, res) {
  let sql = "SELECT * FROM v6";
  connection.query(sql, function (err, result) {
    if (err) throw err;

    res.send(result);
  });
});

// read data from database v7
app.get("/v7", async function (req, res) {
  let sql = "SELECT * FROM v7";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});
//read data from database v8
app.get("/v8", async function (req, res) {
  let sql = "SELECT * FROM v8 ";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//listen method
app.listen(port, function (err) {
  console.log("listening...." + port);
});

//-------SIGNUP (create a new user and store it in the database with unique id and hashed password)---------
app.post("/signup", (req, res) => {
  console.log(req.body)

  if('username' in req.body == false ) {
    res.status(400);
    res.json({status: "Missing username from body"})
    return;
  }
  if('password' in req.body == false ) {
    res.status(400);
    res.json({status: "Missing password from body"})
    return;
  }
  if('email' in req.body == false ) {
    res.status(400);
    res.json({status: "Missing email from body"})
    return;
  }

  //Create hash of the password with salt
  const salt = bcrypt.genSaltSync(6)
  const passwordHash = bcrypt.hashSync(req.body.password, salt)

  const newUser = {
    id: uuidv4(),
    email: req.body.email,
    username: req.body.username,
    password: passwordHash
  }

  console.log(newUser)
  connection.query(`INSERT INTO User(User_id, Email, Username, Password) VALUES ('${newUser.id}', '${newUser.email}', '${newUser.username}', '${newUser.password}')`, res);

  res.status(201).json({ status: "user created" })
})
//------------------------------------------------------------------------------------------------------
