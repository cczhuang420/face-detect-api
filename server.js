const express = require("express");
const bcrypt = require("bcrypt");
const { handleRegister } = require("./controllers/register.js");
const { handleSignin } = require("./controllers/signin.js");
const { updateEntries } = require("./controllers/image.js");
const { getProfile } = require("./controllers/profile.js");
const { handleImageAPI } = require("./controllers/imageApi.js");
const cors = require("cors");

const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "",
    password: "",
    database: "face-database",
  },
});

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json(database[0]);
});

app.post("/signin", (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

// '/profile/:id'
app.get("/profile/:id", (req, res) => {
  getProfile(req, res, db);
});

// '/images'
app.put("/image", (req, res) => {
  updateEntries(req, res, db);
});

app.post("/imageApi", (req, res) => {
  handleImageAPI(req, res);
});

app.listen(3000);
