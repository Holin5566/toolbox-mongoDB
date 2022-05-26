const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { personModel } = require("./models");
const { personRoute } = require("./routers");
require("dotenv").config();
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

//bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set cors
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//NOTE router example
app.use("/api/person", personRoute);

//NOTE post example
app.post("/set", async (req, res) => {
  const { body } = req; // { "name":"Joe","gender":"male", "age":"18" }

  const newPerson = new personModel(body); //建立新 person 物件
  await newPerson.save(); // 寫入 DB
  res.send({ body });
});

app.listen(env.DB_PORT, () => {
  console.log(`Example app listening on port ${env.DB_PORT}`);
});
