const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { tagRouter, toolRouter, userRouter } = require("./routers");
require("dotenv").config();
const app = express();
const env = process.env;
const connectDB = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@cluster0.a43as.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(connectDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect DB");
  })
  .catch((e) => console.log(e));

//set cors
app.use(cors());
//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//index
app.get("/", (req, res) => {
  res.send("tool box server");
});

//NOTE router
app.use("/api/user", userRouter);
app.use("/api/tool", toolRouter);
app.use("/api/tag", tagRouter);

app.listen(env.PORT, () => {
  console.log(`tool box server listening on port ${env.PORT}`);
});
