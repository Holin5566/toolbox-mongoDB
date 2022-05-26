const router = require("express").Router();
const { Tools, Tags } = require("../models");
// Model
// name: String,
// tags: Object,
// logo: String,
// content: String,

router.use((req, res, next) => {
  console.log("A request is coming in to tool-router");
  next();
});

// NOTE GET tool
router.get("/", async (req, res) => {
  try {
    const data = await Tools.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/tags", async (req, res) => {
  // query = {_id}
  const { query } = req;
  await Tools.findOne(query)
    .populate("tags")
    .exec((err, tool) => {
      if (err) res.status(400).send(err);
      res.status(200).send(tool.tags);
    });
});

// NOTE POST tool
router.post("/", async (req, res) => {
  //body = { name, tags, content }
  const data = req.body;

  // process data
  const name = data.name.toLowerCase();
  const logo = "Di" + name[0].toUpperCase() + name.slice(1);
  const complete = { ...data, name, logo, tags: [] };

  //建立新 tag 物件
  const newData = new Tools(complete);

  // 寫入 DB
  try {
    await newData.save();
    res.status(200).send({ msg: `post new tool #${complete.name}`, complete });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
