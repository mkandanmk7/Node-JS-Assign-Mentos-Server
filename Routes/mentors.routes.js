const router = require("express").Router();
const { ObjectId } = require("mongodb");
const { mentorSchema } = require("../shared/schema");
const db = require("../shared/mongo");

//list mentor
router.get("/", async (req, res) => {
  let data = await db.mentors.find().toArray();
  res.send(data);
});

//create new Mentor
router.post("/", async (req, res) => {
  console.log("in mentor post", req.body);
  const { value, error } = await mentorSchema.validate(req.body);
  console.log(value, error);
  if (error) return res.status(400).send({ Error: error.details[0].message });
  const data = await db.mentors.insertOne(value);
  console.log(data);
  res.status(200).send(value);
});

module.exports = router;
