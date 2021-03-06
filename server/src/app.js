require("dotenv").config();


const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

require("./db");
const api = require("./api/index");
const middlewares = require("./middlewares");

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome",
  });
});

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
