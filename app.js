const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbconnect");
const app = express();

const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middleware/errorhandler");
// const PORTS = process.env.PORT || 4000;

const PORTS = 4000;
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", authRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(PORTS, () => {
  console.log("Server stated at port" + PORTS);
});
