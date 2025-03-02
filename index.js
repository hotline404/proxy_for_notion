const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const getPost = require("./service.js");
const target = process.env.TARGET;

app.use(bodyParser.json());

const cors = require("cors");

app.use(cors({ origin: target }));

app.get("/post", async (req, res) => {
  try {
    const post = await getPost();

    res.send(post)
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, console.log(`server started on post ${PORT}`));
