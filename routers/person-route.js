const router = require("express").Router();

router.use((req, res, next) => {
  console.log("A request is coming in to person-route");
  next();
});

router.post("/", async (req, res) => {
  const { body } = req; // { "name":"Joe","gender":"male", "age":"18" }
  const newPerson = new personModel(body); //建立新 person 物件
  await newPerson.save(); // 寫入 DB
  res.send({ body });
});

module.exports = router;
