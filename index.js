const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/photos", async (req, res) => {
  const album = req.query.albumId;
  const respose = await axios.get(
    "https://jsonplaceholder.typicode.com/photos",
    {
      params: { album },
    }
  );
  res.json(respose.data);
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
