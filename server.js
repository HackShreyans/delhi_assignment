const express = require("express");
const mongoose = require("mongoose");

//dotenv file use for hiding sensitive data
require("dotenv").config();

const app = express();

// this is used for data reading and posting
app.use(express.json());

//checking api work properly or not
app.get("/", (req, res) => {
  res.send("get the api");
});
app.use(require("./View/userRoute"));

//mongoose db connectvity
mongoose
  .connect(process.env.mngoos_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("connected with db"))
  .catch(e => console.log("Error in db connect", e));

//listening port
app.listen(process.env.PORT, () => {
  console.log(`app is listening port: http://localhost:${process.env.PORT}`);
});
