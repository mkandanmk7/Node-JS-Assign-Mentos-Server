const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.DB_URL);

module.exports = {
  db: null,
  students: null,
  mentors: null,

  async connect() {
    await client.connect();
    console.log("db connect at ", process.env.DB_URL);

    //select db
    this.db = client.db(process.env.DB_NAME);

    //choose collections;

    this.students = this.db.collection("students");
    this.mentors = this.db.collection("mentors");
  },
};
