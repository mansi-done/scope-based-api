const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");


//env variables config 
dotenv.config();

//Connect to db
mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("Connected to MongoDB Database");
});

//Middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

//Import Routes
const authRoute = require("./routes/schoolAuth");
const userauthRoute = require("./routes/userAuth");
const roleauthRoute = require("./routes/roleAuth");
const studentauthRoute = require("./routes/studentAuth");

//Middleware Routes
app.use("/school", authRoute);
app.use("/user", userauthRoute);
app.use("/role", roleauthRoute);
app.use("/student", studentauthRoute);

app.listen(port, () => console.log("Server listening on port 3000"));
