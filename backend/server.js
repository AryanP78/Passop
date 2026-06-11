const cors = require("cors");
const express = require("express");
const { ObjectId } = require("mongodb");

require("dotenv").config();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database name
const dbName = "passOP";

app.use(bodyParser.json());

async function startServer() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection("passwords");

    // GET all passwords
    app.get("/", async (req, res) => {
      try {
        const result = await collection.find({}).toArray();
        res.json(result);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // SAVE a password
    app.post("/", async (req, res) => {
      try {
        const password = req.body;

        const result = await collection.insertOne(password);

        res.send({
          success: true,
          result: result,
        });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.put("/:id", async (req, res) => {
      try {
        const db = client.db(dbName);
        const collection = db.collection("passwords");

        const result = await collection.updateOne(
          { _id: new ObjectId(req.params.id) },
          {
            $set: {
              site: req.body.site,
              username: req.body.username,
              password: req.body.password,
            },
          },
        );

        res.send({
          success: true,
          result,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    });

    app.delete("/:id", async (req, res) => {
      try {
        const password = req.body;

        const result = await collection.deleteOne(password);

        res.send({
          success: true,
          result: result,
        });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
}

startServer();
