const router = require("express").Router();

const db = require("../shared/mongo");

const { ObjectId } = require("mongodb");

const { studentSchema } = require("../shared/schema");

//list students
router.get("/", async (req, res) => {
  let data = await db.students.find().toArray();
  console.log(data);
  res.send(data);
});

//create new student
router.post("/", async (req, res) => {
  const { value, error } = studentSchema.validate(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });
  let data;
  if (value.mentor === "unassigned") {
    data = await db.students.insertOne(value);
  } else {
    data = await db.students.insertOne({
      ...value,
      mentor: ObjectId(value.mentor),
    });
  }
  res.send(value);
});

//assign mentor to multiple students
router.put("/assignMentor", async (req, res) => {
  console.log("in assignMentor");

  let data = await db.students.updateMany(
    { name: { $in: req.body.names } },
    { $set: { mentor: ObjectId(req.body.mentor) } }
  );
  res.status(201).send("updated");
});

//change mentor for a particular student
router.put("/:_id", async (req, res) => {
  let id = req.params._id; //its student id
  console.log(id, req.body); // its mentor id
  let data = await db.students.findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { mentor: ObjectId(req.body.mentor) } },
    { returnNewDocument: true }
  );
  res.send(data);
});

//show all students for a particular mentor
router.get("/getMentor/:mentor", async (req, res) => {
  let id = req.params.mentor;
  console.log(id);
  let data = await db.students.find({ mentor: ObjectId(id) }).toArray();
  res.send(data);
});

module.exports = router;
