const router = require("express").Router();

const db = require("../shared/mongo");

const { ObjectId } = require("mongodb");

const { studentSchema } = require("../shared/schema");

//create new student
router.post("/", async (req, res) => {
  const { value, error } = studentSchema.validate(req.body);
  if (error) return res.status(400).send({ Error: error.details[0].message });
  let data;
  if (value.mentorId === "unassigned") {
    data = await db.students.insert(value);
  } else {
    data = await db.students.insert({
      ...value,
      mentorId: ObjectId(value.mentorId),
    });
  }
  res.send(value);
});

//assign mentor to multiple students
router.put("/assignMentor", async (req, res) => {
  console.log("in assignMentor");

  let data = await db.students.updateMany(
    { name: { $in: req.body.names } },
    { $set: { mentorId: ObjectId(req.body.mentorId) } }
  );
  res.status(201).send("updated");
});

module.exports = router;
