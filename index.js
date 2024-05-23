const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const redis = require("redis");

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Create a redis client
const redisClient = redis.createClient();

app.get("/photos", (req, res) => {
  const album = req.query.albumId;

  // Check if the data is cached
  redisClient.get("photos", async (err, photos) => {
    if (err) console.error(err);
    if (photos != null) {
      console.log("Returned from Cache");
      return res.json(JSON.parse(photos));
    }
    console.log("Returned from API");
    const respose = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      {
        params: { album },
      }
    );
    redisClient.setEx("photos", 120, JSON.stringify(respose.data));
  });
});

app.get("/photos/:id", async (req, res) => {
  const { id } = req.params;
  const respose = await axios.get(
    `https://jsonplaceholder.typicode.com/photos/${id}`
  );
  res.json(respose.data);
});

app.listen(3000, (req, res) => {
  console.log("Server running");
});
