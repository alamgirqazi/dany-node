const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const errorHandler = require("./middleware/error-handler");
const errorMessage = require("./middleware/error-message");
const accessControls = require("./middleware/access-controls");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json()); // to support JSON-encoded bodies

// Requiring Routes

const UsersRoutes = require("./routes/users.routes");
const ProductRoutes = require("./routes/products.routes");
const UserProductRoutes = require("./routes/user-products.routes");

// connection to mongoose
const mongoCon = process.env.mongoCon;

mongoose.connect(mongoCon, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const fs = require("fs");
fs.readdirSync(__dirname + "/models").forEach(function (file) {
  require(__dirname + "/models/" + file);
});

// in case you want to serve images
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.status(200).send({
    message: "Express backend server",
  });
});
app.get("/test", function (req, res) {
  const arr = [
    {
      "title": "Dawn of the Planet of the Apes",
      "rating": 8.3,
      "releaseYear": 2014
      },
    {
      "title": "Apes",
      "rating": 8.5,
      "releaseYear": 2014
      },
    {
      "title": "Dawn",
      "rating": 8.3,
      "releaseYear": 2014
      },

  ]
  res.status(200).send(arr);
});

//  app.set('port', (3000));

app.set("port", process.env.PORT);

app.use(accessControls);
app.use(cors());

// Routes which should handle requests
app.use("/users", UsersRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/users/products", UserProductRoutes);

app.use(errorHandler);

app.use(errorMessage);

server.listen(app.get("port"));
console.log("listening on port", app.get("port"));
