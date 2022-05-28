const router = require("express").Router();
const { Tags: Model } = require("../models");
// Model
// name: String,
// logo: String,

router.use((req, res, next) => {
  console.log("A request is coming in to tag-router");
  next();
});

// NOTE GET tag
router.get("/", async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});

// NOTE POST tag
router.post("/", async (req, res) => {
  //body = { name }
  const data = req.body;
  // process data
  const name = data.name.toLowerCase();
  const logo = "Di" + name[0].toUpperCase() + name.slice(1);
  const complete = { name, logo };

  //建立新 tag 物件
  const newData = new Model(complete);

  // 寫入 DB
  try {
    await newData.save();
    res.status(200).send({ msg: `post new tag #${complete.name}`, complete });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
