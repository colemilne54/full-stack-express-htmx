const express = require('express');
const bodyParser = require("body-parser");
const sequelize = require("./app/model/dbconfig");
const Book = require("./app/model/book");

// auto create table on startup
sequelize.sync({ force: true }).then(async () => {
  console.log("db is ready");
});

const app = express();
app.use(express.json());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "pug");

app.get("/", async (req, res) => {
  const books = await Book.findAndCountAll();
  return res.render("index", { books: books.rows });
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Service endpoint = http://localhost:${PORT}`);
});
