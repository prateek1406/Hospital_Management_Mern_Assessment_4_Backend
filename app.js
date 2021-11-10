const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
// const cookieParser = require('cookie-parser');
const patientRouter = require("./routes/patientRouter");
require("dotenv/config");
require("./database/connection");
const userRouter = require("./routes/userRouter");
const GlobalErrorHandler = require("./controllers/errorController");
const app = express();
app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/patients", patientRouter);

app.use(GlobalErrorHandler);
module.exports = app;
