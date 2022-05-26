const router = require("express").Router();
const { Users: Model } = require("../models");
// Model
// name: String,
// uid: String,
// email: String,
// avatar: String,
// used: Object,
// interested: Object,
// creatAt: Date,

router.use((req, res, next) => {
  console.log("A request is coming in to tool-router");
  next();
});

// NOTE GET user
router.get("/", async (req, res) => {
  const { query } = req;
  try {
    const data = await Model.findOne(query);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
});
// router.get("/getTagsById", async (req, res) => {
//   const { query } = rea;
//   try {
//     const data = await Model.find();
//     res.status(200).send(data);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// NOTE POST user
router.post("/", async (req, res) => {
  //body = { uid, name, email, avatar }
  const data = req.body;
  console.log(data);
  // process data
  const used = [];
  const interested = [];
  const creatAt = new Date();
  const complete = { ...data, used, interested, creatAt };

  //建立新 tag 物件
  const newData = new Model(complete);

  // 寫入 DB
  try {
    await newData.save();
    res.send({ msg: `post new tool #${complete.name}`, complete });
  } catch (e) {
    res.send(e);
  }
});

router.post("/used", async (req, res) => {
  //body = { uid,tool_id }
  const { uid, tool_id } = req.body;
  // process data
  try {
    const user = await Model.findOne({ uid });
    user.used.push({ _id: tool_id });
    const complete = user;

    //建立新 tag 物件
    const newData = new Model(complete);

    // 寫入 DB
    try {
      await newData.save();
      res
        .status(200)
        .send({ msg: `the tool has been used #${tool_id}`, complete });
    } catch (e) {
      res.status(400).send(e);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
router.post("/interested", async (req, res) => {
  //body = { uid,tool_id }
  const { uid, tool_id } = req.body;
  // process data
  try {
    const user = await Model.findOne({ uid });
    user.interested.push({ _id: tool_id });
    const complete = user;

    //建立新 tag 物件
    const newData = new Model(complete);

    // 寫入 DB
    try {
      await newData.save();
      res
        .status(200)
        .send({ msg: `the tool has been used #${tool_id}`, complete });
    } catch (e) {
      res.status(400).send(e);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// NOTE DELETE user
router.delete("/used", async (req, res) => {
  //body = { uid,tool_id }
  const { uid, tool_id } = req.query;
  console.log(req.query);
  // process data
  console.log(req.body);
  try {
    const user = await Model.findOne({ uid });
    user.used = user.used.filter((used) => used._id.toString() !== tool_id);
    const complete = user;

    //建立新 tag 物件
    const newData = new Model(complete);

    // 寫入 DB
    try {
      await newData.save();
      res
        .status(200)
        .send({ msg: `the tool hasn't been used #${tool_id}`, complete });
    } catch (e) {
      res.status(400).send(e);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/interested", async (req, res) => {
  //body = { uid,tool_id }
  const { uid, tool_id } = req.query;
  console.log(req.query);
  // process data
  try {
    const user = await Model.findOne({ uid });
    user.interested = user.interested.filter(
      (interested) => interested._id.toString() !== tool_id
    );
    const complete = user;

    //建立新 tag 物件
    const newData = new Model(complete);

    // 寫入 DB
    try {
      await newData.save();
      res
        .status(200)
        .send({ msg: `the tool hasn't been used #${tool_id}`, complete });
    } catch (e) {
      res.status(400).send(e);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
