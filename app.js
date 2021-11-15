require("dotenv").config();
const cors = require("cors");
const express = require("express");
const db = require("./shared/mongo");

const app = express();

app.use(cors());

(async () => {
  await db.connect();

  app.use(express.json());

  app.get("/", (req, res) => {
    console.log("Server is running successfully");
  });

  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log("seriver is running at ", port);
  });
})();
