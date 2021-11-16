require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./shared/mongo");

//routes imports
const studentRoutes = require("./Routes/students.routes");
const mentorRoutes = require("./Routes/mentors.routes");

const app = express();

app.use(cors());

(async () => {
  await db.connect();

  app.use(express.json());

  app.get("/", (req, res) => {
    console.log("Server is running successfully");
  });

  //middleware routes
  app.use("/students", studentRoutes);
  app.use("/mentors", mentorRoutes);

  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log("seriver is running at ", port);
  });
})();
